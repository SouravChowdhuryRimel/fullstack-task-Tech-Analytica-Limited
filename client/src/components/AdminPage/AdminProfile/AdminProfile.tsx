"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Camera, Loader2, Mail, Phone, RefreshCw } from "lucide-react";
import { LiaUserEditSolid } from "react-icons/lia";
import { Label } from "@/components/ui/label";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";

import { useAppSelector } from "@/redux/hooks/redux-hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

const AdminProfile = () => {
  const user = useAppSelector(useCurrentUser);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phoneNumber: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.image || "/default-avatar.png",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!user) return <div className="p-10 text-center">Loading profile...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsDialogOpen(false);
      setSelectedFile(null);
      toast.success("Profile updated successfully (static demo)");
    }, 1500);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm px-8 py-6 relative border border-gray-100 transition-all hover:shadow-md">
      {/* Edit Icon */}
      <div className="absolute top-5 right-5">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              className="p-2 rounded-lg border border-gray-200 shadow-xs cursor-pointer transition-all hover:bg-gray-50 hover:shadow-sm group"
              aria-label="Edit Profile"
            >
              <LiaUserEditSolid className="h-5 w-5 text-[#156EF0] group-hover:text-[#0B4DB8] transition-colors duration-200" />
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[540px] rounded-lg backdrop-blur-sm">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Update Profile
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-5">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-offset-2 ring-blue-500/20">
                  <Image
                    src={previewImage || "/default-avatar.png"}
                    alt="Profile Preview"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                  {selectedFile && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <RefreshCw className="h-6 w-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                  disabled={isUpdating}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setSelectedFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="fullName"
                    className="text-gray-700 font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="focus-visible:ring-blue-500"
                    disabled={isUpdating}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 font-semibold"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user.email}
                    className="bg-gray-50 text-gray-500"
                    disabled
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-gray-700 font-medium"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="focus-visible:ring-blue-500"
                    disabled={isUpdating}
                  />
                </div>
              </div>
            </div>

            <AlertDialogFooter className="mt-6">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setSelectedFile(null);
                  setPreviewImage(user.image || "/default-avatar.png");
                }}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </AlertDialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Profile Layout */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-500/30">
            <Image
              src={
                previewImage ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt="Profile"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1 uppercase">
              Role: {user.role}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm text-gray-500 font-semibold">Email</h3>
            </div>
            <p className="text-gray-900">{user.email}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm text-gray-500 font-semibold">Phone</h3>
            </div>
            <p className="text-gray-900">
              {formData.phoneNumber || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
