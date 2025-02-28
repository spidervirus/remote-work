import { Metadata } from "next"
import { ProfileSettings } from "@/components/profile-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { ThemeSettings } from "@/components/theme-settings"
import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences.",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Profile Settings */}
        <ProfileSettings />

        {/* Notification Settings */}
        <NotificationSettings />

        {/* Theme Settings */}
        <ThemeSettings />

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Coming soon</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">
                    Change your password.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Coming soon</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Active Sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your active sessions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Coming soon</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 