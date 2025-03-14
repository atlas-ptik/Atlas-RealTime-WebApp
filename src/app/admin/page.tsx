"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { addDocument, updateDocument, deleteDocument } from "@/lib/firestore";
import { useRealtime } from "@/hooks/useRealtime";

// Define information item interface
interface InfoItem {
  id?: string;
  title: string;
  content: string;
  createdAt?: any; // Firestore timestamp
  updatedAt?: any; // Firestore timestamp
}

export default function AdminPage() {
  // States for form and editing
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the custom hook to get real-time data
  const { data: infoItems, loading, error } = useRealtime<InfoItem>("info");

  // Reset form function
  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditMode(false);
    setCurrentId(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editMode && currentId) {
        // Update existing document
        await updateDocument<InfoItem>("info", currentId, { title, content });
        toast.success("Information updated successfully");
      } else {
        // Add new document
        await addDocument<InfoItem>("info", { title, content });
        toast.success("Information added successfully");
      }
      resetForm();
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit function
  const handleEdit = (item: InfoItem) => {
    if (item.id) {
      setTitle(item.title);
      setContent(item.content);
      setEditMode(true);
      setCurrentId(item.id);
    }
  };

  // Delete confirmation
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Delete function
  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteDocument("info", deleteId);
        toast.success("Information deleted successfully");
      } catch (err) {
        toast.error("An error occurred while deleting");
        console.error(err);
      } finally {
        setDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleString();
      }
      return "Invalid timestamp";
    } catch (err) {
      return "Invalid timestamp";
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-black/40 backdrop-blur-sm border border-red-500/50 rounded-lg">
        <h2 className="text-xl text-red-500 font-bold mb-2">System Error</h2>
        <p className="text-gray-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Information Management</h1>
          <div className="inline-flex items-center bg-black/40 border border-green-500/30 rounded-full px-3 py-1 text-sm text-green-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            Admin Control
          </div>
        </div>
        <div className="inline-flex items-center bg-black/40 border border-yellow-500/30 rounded-full px-3 py-1 text-sm text-yellow-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Session expires in 60 minutes
        </div>
      </div>

      <Card className="bg-black/40 backdrop-blur-sm border border-green-500/30">
        <CardHeader className="border-b border-green-500/20">
          <CardTitle className="text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {editMode ? "Edit Information" : "Add New Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                disabled={isSubmitting}
                className="bg-black/60 border-green-500/30 focus:border-green-500 focus:ring-green-500 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-300">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
                rows={5}
                disabled={isSubmitting}
                className="bg-black/60 border-green-500/30 focus:border-green-500 focus:ring-green-500 text-white"
              />
            </div>
            <div className="flex space-x-2 pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-black font-medium"
              >
                {isSubmitting ? "Processing..." : editMode ? "Update" : "Add"}
              </Button>
              {editMode && (
                <Button
                  variant="outline"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="border-green-500/50 text-green-400 hover:bg-green-500/20"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">Information Items</h2>
        <div className="text-sm text-green-400">Total: {infoItems.length}</div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-40 bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-green-400">Loading information items...</p>
            </div>
          </div>
        ) : infoItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500/40 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400">No information items available</p>
          </div>
        ) : (
          infoItems.map((item) => (
            <Card
              key={item.id}
              className="bg-black/40 backdrop-blur-sm border border-green-500/30 overflow-hidden hover:border-green-500/50 transition-all duration-300"
            >
              <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-600"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{item.content}</p>
                    <div className="text-xs text-gray-500 mt-3 space-y-1">
                      <p className="flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Created: {formatTimestamp(item.createdAt)}
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Updated: {formatTimestamp(item.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="border-green-500/50 text-green-400 hover:bg-green-500/20 transition-all"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => item.id && confirmDelete(item.id)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-black/90 backdrop-blur-md border border-red-500/50 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the
              information item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-black text-white border-green-500/50 hover:bg-black/80">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-900/70 text-white border border-red-500/50 hover:bg-red-900"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
