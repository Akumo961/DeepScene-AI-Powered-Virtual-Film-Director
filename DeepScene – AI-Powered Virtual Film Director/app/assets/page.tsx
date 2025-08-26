"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Film,
  FolderOpen,
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Share2,
  ImageIcon,
  Volume2,
  MessageSquare,
  Star,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

interface Asset {
  id: string
  name: string
  type: "image" | "audio" | "dialogue" | "storyboard"
  url: string
  thumbnail?: string
  tags: string[]
  mood: string
  genre: string
  createdAt: Date
  size: string
  duration?: number
  isFavorite: boolean
  description: string
}

export default function AssetsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedMood, setSelectedMood] = useState<string>("all")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")

  const [assets] = useState<Asset[]>([
    {
      id: "1",
      name: "Mysterious Forest Scene",
      type: "image",
      url: "/mysterious-forest-twilight-ancient-trees-glowing-f.png",
      thumbnail: "/mysterious-forest-twilight-ancient-trees-glowing-f.png",
      tags: ["forest", "twilight", "mysterious", "fantasy"],
      mood: "mysterious",
      genre: "fantasy",
      createdAt: new Date("2024-01-15"),
      size: "1024x1024",
      isFavorite: true,
      description: "A mysterious forest at twilight with ancient trees and glowing fireflies",
    },
    {
      id: "2",
      name: "Hero Close-up",
      type: "image",
      url: "/close-up-protagonist-determined-moonlight-cinemati.png",
      thumbnail: "/close-up-protagonist-determined-moonlight-cinemati.png",
      tags: ["character", "hero", "determined", "moonlight"],
      mood: "dramatic",
      genre: "adventure",
      createdAt: new Date("2024-01-14"),
      size: "1024x1024",
      isFavorite: false,
      description: "Close-up of protagonist looking determined in the moonlight",
    },
    {
      id: "3",
      name: "Alex Voice Track",
      type: "audio",
      url: "/generated-audio-1.mp3",
      tags: ["alex", "dialogue", "curious", "male"],
      mood: "curious",
      genre: "adventure",
      createdAt: new Date("2024-01-13"),
      size: "2.1 MB",
      duration: 3.2,
      isFavorite: false,
      description: "What is this thing? It's glowing like it's alive...",
    },
    {
      id: "4",
      name: "The Discovery Script",
      type: "dialogue",
      url: "/dialogue-script-1.txt",
      tags: ["script", "discovery", "dialogue", "fantasy"],
      mood: "tense",
      genre: "fantasy",
      createdAt: new Date("2024-01-12"),
      size: "1.2 KB",
      isFavorite: true,
      description: "Complete dialogue script for the discovery scene",
    },
    {
      id: "5",
      name: "Main Storyboard",
      type: "storyboard",
      url: "/storyboard-main.pdf",
      thumbnail: "/storyboard-thumbnail.png",
      tags: ["storyboard", "main", "complete", "timeline"],
      mood: "dramatic",
      genre: "fantasy",
      createdAt: new Date("2024-01-11"),
      size: "5.8 MB",
      isFavorite: true,
      description: "Complete storyboard with 12 scenes",
    },
    {
      id: "6",
      name: "Ancient Artifact",
      type: "image",
      url: "/medium-shot-character-ancient-artifact-glowing-mag.png",
      thumbnail: "/medium-shot-character-ancient-artifact-glowing-mag.png",
      tags: ["artifact", "magic", "glowing", "discovery"],
      mood: "mysterious",
      genre: "fantasy",
      createdAt: new Date("2024-01-10"),
      size: "1024x1024",
      isFavorite: false,
      description: "Medium shot of character finding an ancient artifact glowing with magic",
    },
  ])

  const assetTypes = [
    { value: "all", label: "All Assets", icon: FolderOpen },
    { value: "image", label: "Images", icon: ImageIcon },
    { value: "audio", label: "Audio", icon: Volume2 },
    { value: "dialogue", label: "Dialogue", icon: MessageSquare },
    { value: "storyboard", label: "Storyboards", icon: Film },
  ]

  const moods = ["all", "mysterious", "dramatic", "curious", "tense", "romantic", "comedic", "action"]
  const genres = ["all", "fantasy", "adventure", "drama", "comedy", "horror", "sci-fi", "romance"]
  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "oldest", label: "Oldest First" },
    { value: "name", label: "Name A-Z" },
    { value: "type", label: "Type" },
    { value: "favorites", label: "Favorites First" },
  ]

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || asset.type === selectedType
    const matchesMood = selectedMood === "all" || asset.mood === selectedMood
    const matchesGenre = selectedGenre === "all" || asset.genre === selectedGenre

    return matchesSearch && matchesType && matchesMood && matchesGenre
  })

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime()
      case "name":
        return a.name.localeCompare(b.name)
      case "type":
        return a.type.localeCompare(b.type)
      case "favorites":
        return b.isFavorite ? 1 : -1
      default:
        return 0
    }
  })

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon
      case "audio":
        return Volume2
      case "dialogue":
        return MessageSquare
      case "storyboard":
        return Film
      default:
        return FolderOpen
    }
  }

  const getAssetTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-blue-500/10 text-blue-500"
      case "audio":
        return "bg-green-500/10 text-green-500"
      case "dialogue":
        return "bg-purple-500/10 text-purple-500"
      case "storyboard":
        return "bg-orange-500/10 text-orange-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const assetStats = {
    total: assets.length,
    images: assets.filter((a) => a.type === "image").length,
    audio: assets.filter((a) => a.type === "audio").length,
    dialogue: assets.filter((a) => a.type === "dialogue").length,
    storyboards: assets.filter((a) => a.type === "storyboard").length,
    favorites: assets.filter((a) => a.isFavorite).length,
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
                <p className="text-sm text-muted-foreground">Asset Library</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Library
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{assetStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Assets</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{assetStats.images}</div>
              <div className="text-sm text-muted-foreground">Images</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{assetStats.audio}</div>
              <div className="text-sm text-muted-foreground">Audio</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">{assetStats.dialogue}</div>
              <div className="text-sm text-muted-foreground">Dialogue</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{assetStats.storyboards}</div>
              <div className="text-sm text-muted-foreground">Storyboards</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{assetStats.favorites}</div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search Assets</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, tags..."
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Asset Type */}
                <div className="space-y-2">
                  <Label>Asset Type</Label>
                  <div className="space-y-2">
                    {assetTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <Button
                          key={type.value}
                          variant={selectedType === type.value ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedType(type.value)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {type.label}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Mood */}
                <div className="space-y-2">
                  <Label htmlFor="mood">Mood</Label>
                  <Select value={selectedMood} onValueChange={setSelectedMood}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {moods.map((mood) => (
                        <SelectItem key={mood} value={mood}>
                          {mood === "all" ? "All Moods" : mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Genre */}
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre === "all" ? "All Genres" : genre.charAt(0).toUpperCase() + genre.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <Label htmlFor="sort">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assets Grid */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Assets ({sortedAssets.length})</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedAssets.map((asset) => {
                    const Icon = getAssetIcon(asset.type)
                    return (
                      <Card key={asset.id} className="group hover:shadow-lg transition-all cursor-pointer">
                        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
                          {asset.thumbnail ? (
                            <img
                              src={asset.thumbnail || "/placeholder.svg"}
                              alt={asset.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Icon className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                              {asset.isFavorite ? (
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ) : (
                                <Star className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className={getAssetTypeColor(asset.type)}>{asset.type}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-medium text-sm line-clamp-1">{asset.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{asset.description}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{asset.size}</span>
                              <span>{asset.createdAt.toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {asset.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {asset.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{asset.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedAssets.map((asset) => {
                    const Icon = getAssetIcon(asset.type)
                    return (
                      <Card key={asset.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                              {asset.thumbnail ? (
                                <img
                                  src={asset.thumbnail || "/placeholder.svg"}
                                  alt={asset.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <Icon className="w-6 h-6 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-sm truncate">{asset.name}</h3>
                                {asset.isFavorite && (
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{asset.description}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge className={getAssetTypeColor(asset.type)}>{asset.type}</Badge>
                                <span>{asset.size}</span>
                                {asset.duration && <span>{asset.duration}s</span>}
                                <span>{asset.createdAt.toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}

              {sortedAssets.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center space-y-4">
                      <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="font-medium text-foreground">No assets found</p>
                        <p className="text-sm text-muted-foreground">Try adjusting your filters or create new assets</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
