"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  Film,
  Volume2,
  Play,
  Pause,
  Square,
  Download,
  Upload,
  Mic,
  Settings,
  Loader2,
  Sparkles,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react"
import Link from "next/link"

interface VoiceProfile {
  id: string
  name: string
  gender: string
  accent: string
  age: string
  description: string
  sample?: string
}

interface AudioTrack {
  id: string
  characterName: string
  text: string
  voiceId: string
  emotion: string
  speed: number
  pitch: number
  volume: number
  audioUrl?: string
  duration: number
  isGenerating: boolean
}

export default function AudioPage() {
  const [selectedVoice, setSelectedVoice] = useState("voice-1")
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackProgress, setPlaybackProgress] = useState(0)
  const [masterVolume, setMasterVolume] = useState([75])
  const audioRef = useRef<HTMLAudioElement>(null)

  const voiceProfiles: VoiceProfile[] = [
    {
      id: "voice-1",
      name: "Alex Morgan",
      gender: "Male",
      accent: "American",
      age: "Young Adult",
      description: "Confident and heroic voice, perfect for protagonists",
      sample: "/audio-sample-alex.mp3",
    },
    {
      id: "voice-2",
      name: "Sarah Chen",
      gender: "Female",
      accent: "British",
      age: "Adult",
      description: "Intelligent and articulate, ideal for professional characters",
      sample: "/audio-sample-sarah.mp3",
    },
    {
      id: "voice-3",
      name: "Marcus Stone",
      gender: "Male",
      accent: "Deep American",
      age: "Mature",
      description: "Deep and authoritative, great for mentors and villains",
      sample: "/audio-sample-marcus.mp3",
    },
    {
      id: "voice-4",
      name: "Luna Rivera",
      gender: "Female",
      accent: "Neutral",
      age: "Young",
      description: "Warm and expressive, perfect for emotional scenes",
      sample: "/audio-sample-luna.mp3",
    },
  ]

  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([
    {
      id: "1",
      characterName: "Alex",
      text: "What is this thing? It's glowing like it's alive...",
      voiceId: "voice-1",
      emotion: "Curious",
      speed: 1.0,
      pitch: 1.0,
      volume: 80,
      audioUrl: "/generated-audio-1.mp3",
      duration: 3.2,
      isGenerating: false,
    },
    {
      id: "2",
      characterName: "Morgan",
      text: "Some things are better left undisturbed, young seeker.",
      voiceId: "voice-3",
      emotion: "Warning",
      speed: 0.9,
      pitch: 0.95,
      volume: 75,
      audioUrl: "/generated-audio-2.mp3",
      duration: 4.1,
      isGenerating: false,
    },
  ])

  const emotionOptions = [
    "Neutral",
    "Happy",
    "Sad",
    "Angry",
    "Excited",
    "Worried",
    "Confident",
    "Mysterious",
    "Romantic",
    "Dramatic",
  ]

  const generateAudio = async (trackId: string) => {
    setAudioTracks((tracks) => tracks.map((track) => (track.id === trackId ? { ...track, isGenerating: true } : track)))

    // Simulate AI audio generation delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock generated audio
    setAudioTracks((tracks) =>
      tracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              isGenerating: false,
              audioUrl: `/generated-audio-${trackId}.mp3`,
              duration: Math.random() * 5 + 2, // Random duration between 2-7 seconds
            }
          : track,
      ),
    )
  }

  const playTrack = (trackId: string) => {
    if (currentTrack === trackId && isPlaying) {
      setIsPlaying(false)
      setCurrentTrack(null)
    } else {
      setCurrentTrack(trackId)
      setIsPlaying(true)
      // In a real implementation, this would play the actual audio
    }
  }

  const addNewTrack = () => {
    const newTrack: AudioTrack = {
      id: Date.now().toString(),
      characterName: "New Character",
      text: "",
      voiceId: selectedVoice,
      emotion: "Neutral",
      speed: 1.0,
      pitch: 1.0,
      volume: 80,
      duration: 0,
      isGenerating: false,
    }
    setAudioTracks([...audioTracks, newTrack])
  }

  const updateTrack = (trackId: string, updates: Partial<AudioTrack>) => {
    setAudioTracks((tracks) => tracks.map((track) => (track.id === trackId ? { ...track, ...updates } : track)))
  }

  const deleteTrack = (trackId: string) => {
    setAudioTracks((tracks) => tracks.filter((track) => track.id !== trackId))
  }

  const exportAllAudio = () => {
    // In a real implementation, this would export all audio tracks
    console.log("Exporting all audio tracks...")
  }

  const getVoiceById = (id: string) => voiceProfiles.find((voice) => voice.id === id)

  const totalDuration = audioTracks.reduce((sum, track) => sum + track.duration, 0)

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
                <p className="text-sm text-muted-foreground">Audio Generator</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={exportAllAudio}>
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dialogue">Back to Dialogue</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Voice Library */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-primary" />
                  Voice Library
                </CardTitle>
                <CardDescription>Choose from professional voice actors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {voiceProfiles.map((voice) => (
                    <Card
                      key={voice.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedVoice === voice.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedVoice(voice.id)}
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{voice.name}</h4>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Play className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {voice.gender}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {voice.age}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{voice.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Custom Voice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audio Tracks */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Audio Tracks</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{audioTracks.length} tracks</Badge>
                  <Badge variant="secondary">{totalDuration.toFixed(1)}s total</Badge>
                  <Button onClick={addNewTrack} size="sm">
                    <Mic className="w-4 h-4 mr-2" />
                    Add Track
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {audioTracks.map((track, index) => {
                  const voice = getVoiceById(track.voiceId)
                  return (
                    <Card key={track.id} className="transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {/* Track Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                                {index + 1}
                              </div>
                              <Input
                                value={track.characterName}
                                onChange={(e) => updateTrack(track.id, { characterName: e.target.value })}
                                className="font-medium border-none bg-transparent px-0 focus-visible:ring-0 w-32"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => playTrack(track.id)}
                                disabled={!track.audioUrl}
                              >
                                {currentTrack === track.id && isPlaying ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteTrack(track.id)}>
                                <Square className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Dialogue Text */}
                          <Textarea
                            value={track.text}
                            onChange={(e) => updateTrack(track.id, { text: e.target.value })}
                            placeholder="Enter dialogue text..."
                            className="min-h-[60px] resize-none"
                          />

                          {/* Voice Controls */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs">Voice</Label>
                              <Select
                                value={track.voiceId}
                                onValueChange={(value) => updateTrack(track.id, { voiceId: value })}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {voiceProfiles.map((voice) => (
                                    <SelectItem key={voice.id} value={voice.id}>
                                      {voice.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">Emotion</Label>
                              <Select
                                value={track.emotion}
                                onValueChange={(value) => updateTrack(track.id, { emotion: value })}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {emotionOptions.map((emotion) => (
                                    <SelectItem key={emotion} value={emotion}>
                                      {emotion}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">Speed: {track.speed.toFixed(1)}x</Label>
                              <Slider
                                value={[track.speed]}
                                onValueChange={([value]) => updateTrack(track.id, { speed: value })}
                                min={0.5}
                                max={2.0}
                                step={0.1}
                                className="w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">Pitch: {track.pitch.toFixed(1)}</Label>
                              <Slider
                                value={[track.pitch]}
                                onValueChange={([value]) => updateTrack(track.id, { pitch: value })}
                                min={0.5}
                                max={1.5}
                                step={0.05}
                                className="w-full"
                              />
                            </div>
                          </div>

                          {/* Generate Button */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {voice && <span>{voice.name}</span>}
                              <Badge variant="outline" className="text-xs">
                                {track.emotion}
                              </Badge>
                              {track.duration > 0 && <span>{track.duration.toFixed(1)}s</span>}
                            </div>
                            <Button
                              onClick={() => generateAudio(track.id)}
                              disabled={!track.text.trim() || track.isGenerating}
                              size="sm"
                            >
                              {track.isGenerating ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Generate Audio
                                </>
                              )}
                            </Button>
                          </div>

                          {/* Progress Bar for Generation */}
                          {track.isGenerating && (
                            <div className="space-y-2">
                              <Progress value={66} className="w-full" />
                              <p className="text-xs text-muted-foreground text-center">
                                Processing audio with AI voice synthesis...
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                {audioTracks.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="flex items-center justify-center py-12">
                      <div className="text-center space-y-4">
                        <Volume2 className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="font-medium text-foreground">No audio tracks yet</p>
                          <p className="text-sm text-muted-foreground">
                            Add a track to start generating character voices
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Master Controls */}
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Master Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Master Volume</Label>
                    <div className="flex items-center gap-2">
                      <VolumeX className="w-4 h-4 text-muted-foreground" />
                      <Slider
                        value={masterVolume}
                        onValueChange={setMasterVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">{masterVolume[0]}%</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  {currentTrack && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>0:00</span>
                        <span>{audioTracks.find((t) => t.id === currentTrack)?.duration.toFixed(1) || "0.0"}s</span>
                      </div>
                      <Progress value={playbackProgress} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export as MP3
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export as WAV
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Script
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
