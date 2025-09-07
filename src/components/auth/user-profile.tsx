"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { UpdateProfileRequest, ChangePasswordRequest, api } from "@/lib/api";

export function UserProfile() {
  const router = useRouter();
  const { user, token, logout, refreshProfile } = useAuth();

  const [profileData, setProfileData] = useState<UpdateProfileRequest>({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState<ChangePasswordRequest>({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [profileError, setProfileError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [profileSuccess, setProfileSuccess] = useState<string>("");
  const [passwordSuccess, setPasswordSuccess] = useState<string>("");

  useEffect(() => {
    console.log("UserProfile - user object:", user);
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (profileError) setProfileError("");
    if (profileSuccess) setProfileSuccess("");
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (passwordError) setPasswordError("");
    if (passwordSuccess) setPasswordSuccess("");
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setProfileError("");
    setProfileSuccess("");
    setIsProfileLoading(true);

    if (!profileData.name || !profileData.email) {
      setProfileError("Please fill in all fields");
      setIsProfileLoading(false);
      return;
    }

    try {
      await api.updateProfile(token, profileData);
      await refreshProfile();
      setProfileSuccess("Profile updated successfully!");
    } catch (error) {
      setProfileError(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setPasswordError("");
    setPasswordSuccess("");
    setIsPasswordLoading(true);

    if (
      !passwordData.current_password ||
      !passwordData.password ||
      !passwordData.password_confirmation
    ) {
      setPasswordError("Please fill in all fields");
      setIsPasswordLoading(false);
      return;
    }

    if (passwordData.password !== passwordData.password_confirmation) {
      setPasswordError("New passwords do not match");
      setIsPasswordLoading(false);
      return;
    }

    if (passwordData.password.length < 8) {
      setPasswordError("New password must be at least 8 characters long");
      setIsPasswordLoading(false);
      return;
    }

    try {
      await api.changePassword(token, passwordData);
      setPasswordSuccess("Password changed successfully! Please login again.");
      setPasswordData({
        current_password: "",
        password: "",
        password_confirmation: "",
      });

      // Logout user after password change
      setTimeout(() => {
        logout();
        router.push("/login");
      }, 2000);
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : "Failed to change password"
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            Please log in to view your profile
          </p>
          <Button onClick={() => router.push("/login")} className="mt-4">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  {profileError && (
                    <Alert variant="destructive">
                      <AlertDescription>{profileError}</AlertDescription>
                    </Alert>
                  )}

                  {profileSuccess && (
                    <Alert>
                      <AlertDescription className="text-green-600">
                        {profileSuccess}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={profileData.name}
                      onChange={handleProfileInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={profileData.email}
                      onChange={handleProfileInputChange}
                      disabled
                    />
                  </div>

                  <Button type="submit" disabled={isProfileLoading}>
                    {isProfileLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  {passwordError && (
                    <Alert variant="destructive">
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}

                  {passwordSuccess && (
                    <Alert>
                      <AlertDescription className="text-green-600">
                        {passwordSuccess}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current_password"
                        name="current_password"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={passwordData.current_password}
                        onChange={handlePasswordInputChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={passwordData.password}
                        onChange={handlePasswordInputChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password_confirmation">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={passwordData.password_confirmation}
                        onChange={handlePasswordInputChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" disabled={isPasswordLoading}>
                    {isPasswordLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Change Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
