import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Film, Palette, MessageSquare, Volume2, FolderOpen, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Film className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">DeepScene</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Virtual Film Director</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Button variant="outline">Sign In</Button>
              <Button asChild>
                <Link href="/generate">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Create Cinematic Stories with <span className="text-primary">AI Assistance</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Transform your creative vision into professional storyboards, generate stunning scenes, and bring characters
            to life with our AI-powered film director toolkit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/generate">
                Start Creating
                <Film className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/assets">View Assets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Everything You Need to Direct</h3>
            <p className="text-lg text-muted-foreground">
              Powerful AI tools designed for content creators and filmmakers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Scene Generation</CardTitle>
                <CardDescription>
                  Transform text descriptions into stunning visual scenes and concept art
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Text-to-Image with Stable Diffusion</li>
                  <li>• Consistent character design</li>
                  <li>• Multiple art styles</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Dialogue Generation</CardTitle>
                <CardDescription>
                  AI-powered dialogue creation based on scene context and character profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Character-specific voices</li>
                  <li>• Scene-appropriate dialogue</li>
                  <li>• Multiple tone options</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Film className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Storyboard Editor</CardTitle>
                <CardDescription>
                  Drag-and-drop interface for organizing scenes into compelling narratives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Intuitive drag-and-drop</li>
                  <li>• Timeline visualization</li>
                  <li>• Collaboration tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Volume2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Voice Generation</CardTitle>
                <CardDescription>Add character voices with text-to-speech technology</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Multiple voice options</li>
                  <li>• Emotion control</li>
                  <li>• High-quality audio</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Animation Tools</CardTitle>
                <CardDescription>Convert static scenes into animated clips with AI assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Image-to-video conversion</li>
                  <li>• Motion control</li>
                  <li>• Seamless transitions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FolderOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Asset Organization</CardTitle>
                <CardDescription>Smart categorization and management of all your creative assets</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Auto-categorization by mood</li>
                  <li>• Genre-based organization</li>
                  <li>• Easy search and filter</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold text-foreground mb-6">Ready to Transform Your Creative Process?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of creators who are already using AI to bring their stories to life.
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/generate">
              Start Your Free Trial
              <Sparkles className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2024 DeepScene. Powered by AI. Built for creators.</p>
        </div>
      </footer>
    </div>
  )
}
