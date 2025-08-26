"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Film, MessageSquare, Plus, Trash2, Copy, Download, Play, User, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"

interface Character {
  id: string
  name: string
  personality: string
  voice: string
  background: string
  color: string
}

interface DialogueLine {
  id: string
  characterId: string
  text: string
  emotion: string
  timestamp: number
}

interface Scene {
  id: string
  title: string
  context: string
  mood: string
  genre: string
  dialogue: DialogueLine[]
}

export default function DialoguePage() {
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "Alex",
      personality: "Brave, determined, slightly sarcastic",
      voice: "Confident and direct",
      background: "Young adventurer seeking ancient artifacts",
      color: "#0ea5e9",
    },
    {
      id: "2",
      name: "Morgan",
      personality: "Wise, mysterious, speaks in riddles",
      voice: "Calm and measured",
      background: "Ancient guardian of magical secrets",
      color: "#8b5cf6",
    },
  ])

  const [currentScene, setCurrentScene] = useState<Scene>({
    id: "1",
    title: "The Discovery",
    context: "Alex finds an ancient artifact in a mysterious forest while Morgan watches from the shadows",
    mood: "Tense and mysterious",
    genre: "Fantasy Adventure",
    dialogue: [
      {
        id: "1",
        characterId: "1",
        text: "What is this thing? It's glowing like it's alive...",
        emotion: "Curious",
        timestamp: 1,
      },
      {
        id: "2",
        characterId: "2",
        text: "Some things are better left undisturbed, young seeker.",
        emotion: "Warning",
        timestamp: 2,
      },
      {
        id: "3",
        characterId: "1",
        text: "Who's there? Show yourself!",
        emotion: "Defensive",
        timestamp: 3,
      },
    ],
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTone, setSelectedTone] = useState("dramatic")
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    personality: "",
    voice: "",
    background: "",
  })

  const toneOptions = [
    { value: "dramatic", label: "Dramatic", description: "Intense and emotional" },
    { value: "comedic", label: "Comedic", description: "Light-hearted and funny" },
    { value: "romantic", label: "Romantic", description: "Tender and intimate" },
    { value: "action", label: "Action", description: "Fast-paced and urgent" },
    { value: "mysterious", label: "Mysterious", description: "Cryptic and intriguing" },
    { value: "casual", label: "Casual", description: "Natural and conversational" },
  ]

  const emotionOptions = ["Neutral", "Happy", "Sad", "Angry", "Excited", "Worried", "Confident", "Mysterious"]

  const generateDialogue = async () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock generated dialogue
    const newDialogue: DialogueLine[] = [
      {
        id: Date.now().toString(),
        characterId: characters[0]?.id || "1",
        text: "I can feel its power... it's calling to me.",
        emotion: "Intrigued",
        timestamp: currentScene.dialogue.length + 1,
      },
      {
        id: (Date.now() + 1).toString(),
        characterId: characters[1]?.id || "2",
        text: "The artifact chooses its bearer. But are you worthy?",
        emotion: "Testing",
        timestamp: currentScene.dialogue.length + 2,
      },
    ]

    setCurrentScene({
      ...currentScene,
      dialogue: [...currentScene.dialogue, ...newDialogue],
    })
    setIsGenerating(false)
  }

  const addCharacter = () => {
    if (!newCharacter.name.trim()) return

    const character: Character = {
      id: Date.now().toString(),
      name: newCharacter.name,
      personality: newCharacter.personality,
      voice: newCharacter.voice,
      background: newCharacter.background,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }

    setCharacters([...characters, character])
    setNewCharacter({ name: "", personality: "", voice: "", background: "" })
  }

  const deleteCharacter = (characterId: string) => {
    setCharacters(characters.filter((c) => c.id !== characterId))
  }

  const addDialogueLine = () => {
    const newLine: DialogueLine = {
      id: Date.now().toString(),
      characterId: characters[0]?.id || "",
      text: "",
      emotion: "Neutral",
      timestamp: currentScene.dialogue.length + 1,
    }

    setCurrentScene({
      ...currentScene,
      dialogue: [...currentScene.dialogue, newLine],
    })
  }

  const updateDialogueLine = (lineId: string, updates: Partial<DialogueLine>) => {
    setCurrentScene({
      ...currentScene,
      dialogue: currentScene.dialogue.map((line) => (line.id === lineId ? { ...line, ...updates } : line)),
    })
  }

  const deleteDialogueLine = (lineId: string) => {
    setCurrentScene({
      ...currentScene,
      dialogue: currentScene.dialogue.filter((line) => line.id !== lineId),
    })
  }

  const getCharacterById = (id: string) => characters.find((c) => c.id === id)

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
                <p className="text-sm text-muted-foreground">Dialogue Generator</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Script
              </Button>
              <Button variant="outline" asChild>
                <Link href="/storyboard">Back to Storyboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs defaultValue="dialogue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="dialogue">Dialogue Editor</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
          </TabsList>

          <TabsContent value="dialogue" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Scene Context Panel */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      Scene Context
                    </CardTitle>
                    <CardDescription>Set the context for dialogue generation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="scene-title">Scene Title</Label>
                      <Input
                        id="scene-title"
                        value={currentScene.title}
                        onChange={(e) => setCurrentScene({ ...currentScene, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scene-context">Scene Description</Label>
                      <Textarea
                        id="scene-context"
                        value={currentScene.context}
                        onChange={(e) => setCurrentScene({ ...currentScene, context: e.target.value })}
                        className="min-h-[100px]"
                        placeholder="Describe what's happening in this scene..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mood">Mood</Label>
                      <Input
                        id="mood"
                        value={currentScene.mood}
                        onChange={(e) => setCurrentScene({ ...currentScene, mood: e.target.value })}
                        placeholder="e.g., Tense, Romantic, Comedic"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tone">Dialogue Tone</Label>
                      <Select value={selectedTone} onValueChange={setSelectedTone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {toneOptions.map((option) => (
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

                    <Button onClick={generateDialogue} disabled={isGenerating} className="w-full" size="lg">
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Dialogue
                        </>
                      )}
                    </Button>

                    <div className="text-sm text-muted-foreground space-y-2">
                      <p className="font-medium">Tips for better dialogue:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Include character motivations</li>
                        <li>• Describe the emotional stakes</li>
                        <li>• Mention any conflicts or tensions</li>
                        <li>• Specify the setting and atmosphere</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Dialogue Editor */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground">Dialogue Script</h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{currentScene.dialogue.length} lines</Badge>
                      <Button onClick={addDialogueLine} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Line
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {currentScene.dialogue.map((line, index) => {
                      const character = getCharacterById(line.characterId)
                      return (
                        <Card key={line.id} className="transition-all hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="flex flex-col items-center gap-2 min-w-[40px]">
                                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </div>
                              </div>

                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                  <Select
                                    value={line.characterId}
                                    onValueChange={(value) => updateDialogueLine(line.id, { characterId: value })}
                                  >
                                    <SelectTrigger className="w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {characters.map((char) => (
                                        <SelectItem key={char.id} value={char.id}>
                                          <div className="flex items-center gap-2">
                                            <div
                                              className="w-3 h-3 rounded-full"
                                              style={{ backgroundColor: char.color }}
                                            />
                                            {char.name}
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <Select
                                    value={line.emotion}
                                    onValueChange={(value) => updateDialogueLine(line.id, { emotion: value })}
                                  >
                                    <SelectTrigger className="w-32">
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

                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteDialogueLine(line.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>

                                <div className="flex items-start gap-3">
                                  {character && (
                                    <div className="flex items-center gap-2 min-w-[100px]">
                                      <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: character.color }}
                                      />
                                      <span className="font-medium text-sm">{character.name}:</span>
                                    </div>
                                  )}
                                  <Textarea
                                    value={line.text}
                                    onChange={(e) => updateDialogueLine(line.id, { text: e.target.value })}
                                    placeholder="Enter dialogue..."
                                    className="flex-1 min-h-[60px] resize-none"
                                  />
                                </div>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">
                                    {line.emotion}
                                  </Badge>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <Play className="w-3 h-3 mr-1" />
                                    Preview
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}

                    {currentScene.dialogue.length === 0 && (
                      <Card className="border-dashed">
                        <CardContent className="flex items-center justify-center py-12">
                          <div className="text-center space-y-4">
                            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto" />
                            <div>
                              <p className="font-medium text-foreground">No dialogue yet</p>
                              <p className="text-sm text-muted-foreground">
                                Add scene context and generate dialogue to get started
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="characters" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Character List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Characters</h2>
                  <Badge variant="secondary">{characters.length} characters</Badge>
                </div>

                <div className="space-y-4">
                  {characters.map((character) => (
                    <Card key={character.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: character.color }} />
                            <CardTitle className="text-lg">{character.name}</CardTitle>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteCharacter(character.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Personality</p>
                          <p className="text-sm">{character.personality}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Voice</p>
                          <p className="text-sm">{character.voice}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Background</p>
                          <p className="text-sm">{character.background}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Add Character Form */}
              <div>
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Add Character
                    </CardTitle>
                    <CardDescription>Create a new character for dialogue generation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="char-name">Character Name</Label>
                      <Input
                        id="char-name"
                        value={newCharacter.name}
                        onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                        placeholder="e.g., Sarah, Detective Johnson"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="char-personality">Personality</Label>
                      <Textarea
                        id="char-personality"
                        value={newCharacter.personality}
                        onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })}
                        placeholder="e.g., Brave, sarcastic, quick-witted"
                        className="min-h-[60px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="char-voice">Voice & Speaking Style</Label>
                      <Textarea
                        id="char-voice"
                        value={newCharacter.voice}
                        onChange={(e) => setNewCharacter({ ...newCharacter, voice: e.target.value })}
                        placeholder="e.g., Speaks confidently, uses technical jargon"
                        className="min-h-[60px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="char-background">Background</Label>
                      <Textarea
                        id="char-background"
                        value={newCharacter.background}
                        onChange={(e) => setNewCharacter({ ...newCharacter, background: e.target.value })}
                        placeholder="e.g., Former military officer turned private investigator"
                        className="min-h-[60px]"
                      />
                    </div>

                    <Button onClick={addCharacter} disabled={!newCharacter.name.trim()} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Character
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
