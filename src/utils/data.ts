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
      name: "John Doe",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Makanya Belajar",
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
        url: "/dashboard/my-courses",
        icon: SwatchBook,
      },
      {
        name: "Certificate",
        url: "/dashboard/certificate",
        icon: Star,
      },
      {
        name: "Orders",
        url: "/dashboard/orders",
        icon: Video,
      },
    ],
    
    admin: [
      {
        name: "Analytics",
        url: "/admin/analytics",
        icon: ChartColumnDecreasing,
      },
      {
        name: "Flash Sale",
        url: "/admin/flash-sale",
        icon: BadgeDollarSign,
      },
      {
        name: "Courses",
        url: "/admin/courses",
        icon: LibraryBig,
      },
      {
        name: "Certificate Approval",
        url: "/admin/certificate-approval",
        icon: ShieldCheck,
      },
      {
        name: "Users",
        url: "/admin/users",
        icon: Users,
      },
    ],
    
  }

  export const Navmenu = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Courses",
      url: "/courses",
    },
    {
      name: "Teams",
      url: "/teams",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];