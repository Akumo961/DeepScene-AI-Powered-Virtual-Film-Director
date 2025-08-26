"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Film,
  Plus,
  Trash2,
  Move,
  Clock,
  Users,
  Download,
  Share2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Settings,
} from "lucide-react"
import Link from "next/link"

interface StoryboardPanel {
  id: string
  title: string
  description: string
  imageUrl: string
  duration: number
  notes: string
  shotType: string
}

export default function StoryboardPage() {
  const [projectTitle, setProjectTitle] = useState("Untitled Storyboard")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPanel, setCurrentPanel] = useState(0)
  const [draggedPanel, setDraggedPanel] = useState<string | null>(null)
  const [panels, setPanels] = useState<StoryboardPanel[]>([
    {
      id: "1",
      title: "Opening Scene",
      description: "A mysterious forest at twilight with ancient trees and glowing fireflies",
      imageUrl: "/mysterious-forest-twilight-ancient-trees-glowing-f.png",
      duration: 5,
      notes: "Establish mood and setting",
      shotType: "Wide Shot",
    },
    {
      id: "2",
      title: "Character Introduction",
      description: "Close-up of protagonist looking determined in the moonlight",
      imageUrl: "/close-up-protagonist-determined-moonlight-cinemati.png",
      duration: 3,
      notes: "Show character emotion",
      shotType: "Close-up",
    },
    {
      id: "3",
      title: "Discovery",
      description: "Medium shot of character finding an ancient artifact glowing with magic",
      imageUrl: "/medium-shot-character-ancient-artifact-glowing-mag.png",
      duration: 4,
      notes: "Key plot point",
      shotType: "Medium Shot",
    },
  ])

  const totalDuration = panels.reduce((sum, panel) => sum + panel.duration, 0)

  const handleDragStart = (e: React.DragEvent, panelId: string) => {
    setDraggedPanel(panelId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (!draggedPanel) return

    const draggedIndex = panels.findIndex((p) => p.id === draggedPanel)
    if (draggedIndex === -1) return

    const newPanels = [...panels]
    const [draggedItem] = newPanels.splice(draggedIndex, 1)
    newPanels.splice(targetIndex, 0, draggedItem)

    setPanels(newPanels)
    setDraggedPanel(null)
  }

  const addNewPanel = () => {
    const newPanel: StoryboardPanel = {
      id: Date.now().toString(),
      title: `Scene ${panels.length + 1}`,
      description: "New scene description",
      imageUrl: "/new-scene-placeholder.png",
      duration: 3,
      notes: "",
      shotType: "Medium Shot",
    }
    setPanels([...panels, newPanel])
  }

  const deletePanel = (panelId: string) => {
    setPanels(panels.filter((p) => p.id !== panelId))
  }

  const updatePanel = (panelId: string, updates: Partial<StoryboardPanel>) => {
    setPanels(panels.map((p) => (p.id === panelId ? { ...p, ...updates } : p)))
  }

  const playStoryboard = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would cycle through panels
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Film className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">DeepScene</h1>
                <p className="text-sm text-muted-foreground">Storyboard Editor</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" asChild>
                <Link href="/generate">Add Scenes</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 max-w-md">
              <Input
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="text-2xl font-bold border-none bg-transparent px-0 focus-visible:ring-0"
                placeholder="Project Title"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{totalDuration}s total</span>
              </div>
              <Badge variant="secondary">{panels.length} scenes</Badge>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={playStoryboard}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <SkipForward className="w-4 h-4" />
            </Button>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full relative">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(currentPanel / Math.max(panels.length - 1, 1)) * 100}%` }}
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Storyboard Timeline */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Storyboard Timeline</h2>
              <Button onClick={addNewPanel} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Scene
              </Button>
            </div>

            <div className="space-y-4">
              {panels.map((panel, index) => (
                <Card
                  key={panel.id}
                  className={`transition-all duration-200 ${
                    draggedPanel === panel.id ? "opacity-50 scale-95" : "hover:shadow-md"
                  } ${currentPanel === index ? "ring-2 ring-primary" : ""}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, panel.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Panel Number & Drag Handle */}
                      <div className="flex flex-col items-center gap-2 min-w-[60px]">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                          {index + 1}
                        </div>
                        <Move className="w-4 h-4 text-muted-foreground cursor-grab" />
                      </div>

                      {/* Scene Image */}
                      <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={panel.imageUrl || "/placeholder.svg"}
                          alt={panel.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Scene Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Input
                            value={panel.title}
                            onChange={(e) => updatePanel(panel.id, { title: e.target.value })}
                            className="font-medium border-none bg-transparent px-0 focus-visible:ring-0"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePanel(panel.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Textarea
                          value={panel.description}
                          onChange={(e) => updatePanel(panel.id, { description: e.target.value })}
                          className="text-sm resize-none border-none bg-transparent px-0 focus-visible:ring-0"
                          rows={2}
                        />
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {panel.shotType}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <Input
                              type="number"
                              value={panel.duration}
                              onChange={(e) =>
                                updatePanel(panel.id, { duration: Number.parseInt(e.target.value) || 0 })
                              }
                              className="w-12 h-6 text-xs border-none bg-transparent px-1 focus-visible:ring-0"
                              min="1"
                            />
                            <span>s</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Drop Zone for New Panels */}
              <Card
                className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, panels.length)}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <Plus className="w-8 h-8 mx-auto mb-2" />
                    <p>Drop scenes here or click "Add Scene" to continue your storyboard</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Scene Properties</CardTitle>
                <CardDescription>
                  {panels.length > 0 ? `Editing Scene ${currentPanel + 1}` : "No scene selected"}
                </CardDescription>
              </CardHeader>
              {panels[currentPanel] && (
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shot-type">Shot Type</Label>
                    <select
                      id="shot-type"
                      value={panels[currentPanel].shotType}
                      onChange={(e) => updatePanel(panels[currentPanel].id, { shotType: e.target.value })}
                      className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="Wide Shot">Wide Shot</option>
                      <option value="Medium Shot">Medium Shot</option>
                      <option value="Close-up">Close-up</option>
                      <option value="Extreme Close-up">Extreme Close-up</option>
                      <option value="Over-the-shoulder">Over-the-shoulder</option>
                      <option value="Point of View">Point of View</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={panels[currentPanel].duration}
                      onChange={(e) =>
                        updatePanel(panels[currentPanel].id, { duration: Number.parseInt(e.target.value) || 0 })
                      }
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Director Notes</Label>
                    <Textarea
                      id="notes"
                      value={panels[currentPanel].notes}
                      onChange={(e) => updatePanel(panels[currentPanel].id, { notes: e.target.value })}
                      placeholder="Add notes for this scene..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full mb-2 bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Scene
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Replace Image
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
