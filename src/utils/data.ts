import {
    AudioWaveform,
    BadgeDollarSign,
    BrainCircuit,
    ChartColumnDecreasing,
    Command,
    GalleryVerticalEnd,
    LibraryBig,
    ShieldCheck,
    Star,
    SwatchBook,
    Users,
    Video,
    
  } from "lucide-react"

export const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Learning Projects",
        logo: BrainCircuit,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    platform: [
      {
        name: "My Courses",
        url: "#",
        icon: SwatchBook,
      },
      {
        name: "Certificate",
        url: "#",
        icon: Star,
      },
      {
        name: "Orders",
        url: "#",
        icon: Video,
      },
    ],
    
    admin: [
      {
        name: "Analytics",
        url: "#",
        icon: ChartColumnDecreasing,
      },
      {
        name: "Flash Sale",
        url: "#",
        icon: BadgeDollarSign,
      },
      {
        name: "Courses",
        url: "#",
        icon: LibraryBig,
      },
      {
        name: "Certificate Approval",
        url: "#",
        icon: ShieldCheck,
      },
      {
        name: "Users",
        url: "#",
        icon: Users,
      },
    ],
  }