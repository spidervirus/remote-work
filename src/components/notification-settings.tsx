"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    projectUpdates: true,
    teamMessages: true,
    marketingEmails: false,
  })

  async function onSubmit() {
    setIsLoading(true)
    try {
      // Here you would typically make an API call to update notification settings
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      toast.success("Notification settings updated")
    } catch (error) {
      toast.error("Failed to update notification settings")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email Notifications
              </label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email.
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailNotifications: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Push Notifications
              </label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in your browser.
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, pushNotifications: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Task Reminders
              </label>
              <p className="text-sm text-muted-foreground">
                Get reminders about upcoming and overdue tasks.
              </p>
            </div>
            <Switch
              checked={settings.taskReminders}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, taskReminders: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Project Updates
              </label>
              <p className="text-sm text-muted-foreground">
                Receive updates about projects you're involved in.
              </p>
            </div>
            <Switch
              checked={settings.projectUpdates}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, projectUpdates: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Team Messages
              </label>
              <p className="text-sm text-muted-foreground">
                Get notified about new team messages.
              </p>
            </div>
            <Switch
              checked={settings.teamMessages}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, teamMessages: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Marketing Emails
              </label>
              <p className="text-sm text-muted-foreground">
                Receive marketing and promotional emails.
              </p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, marketingEmails: checked })
              }
            />
          </div>
        </div>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  )
} 