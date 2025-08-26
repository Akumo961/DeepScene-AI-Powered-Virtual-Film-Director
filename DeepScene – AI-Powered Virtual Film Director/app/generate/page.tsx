"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Download, Heart, Share2, Palette, Film } from "lucide-react"
import Link from "next/link"

interface GeneratedImage {
  id: string
  url: string
  prompt: string
  style: string
  timestamp: Date
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("cinematic")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock generated image
    const newImage: GeneratedImage = {
      id: Date.now().toString(),
      url: `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt + " " + style + " scene")}`,
      prompt,
      style,
      timestamp: new Date(),
    }

    setGeneratedImages((prev) => [newImage, ...prev])
    setIsGenerating(false)
  }

  const styleOptions = [
    { value: "cinematic", label: "Cinematic", description: "Film-like lighting and composition" },
    { value: "realistic", label: "Realistic", description: "Photorealistic rendering" },
    { value: "artistic", label: "Artistic", description: "Stylized and creative interpretation" },
    { value: "noir", label: "Film Noir", description: "High contrast black and white" },
    { value: "animated", label: "Animated", description: "Cartoon or animated style" },
    { value: "concept", label: "Concept Art", description: "Professional concept art style" },
  ]

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
                <p className="text-sm text-muted-foreground">Scene Generator</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generation Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Generate Scene
                </CardTitle>
                <CardDescription>Describe your scene and let AI bring it to life</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Scene Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="A mysterious forest at twilight with ancient trees and glowing fireflies..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Visual Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full" size="lg">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Scene
                    </>
                  )}
                </Button>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-medium">Tips for better results:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Be specific about lighting and mood</li>
                    <li>• Include camera angles (wide shot, close-up)</li>
                    <li>• Mention time of day and weather</li>
                    <li>• Describe character emotions and actions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Generated Scenes</h2>
                {generatedImages.length > 0 && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {generatedImages.length} scene{generatedImages.length !== 1 ? "s" : ""} generated
                  </Badge>
                )}
              </div>

              {isGenerating && (
                <Card className="border-dashed border-primary/50">
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center space-y-4">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                      <div>
                        <p className="font-medium text-foreground">Creating your scene...</p>
                        <p className="text-sm text-muted-foreground">This may take a few moments</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {generatedImages.length === 0 && !isGenerating && (
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center space-y-4">
                      <Palette className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="font-medium text-foreground">No scenes generated yet</p>
                        <p className="text-sm text-muted-foreground">
                          Enter a scene description and click generate to get started
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {generatedImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.prompt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {styleOptions.find((s) => s.value === image.style)?.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{image.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm text-foreground line-clamp-2">{image.prompt}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
