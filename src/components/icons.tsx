import { Code, Command, FileText, Lightbulb, Moon, PackageSearch, PresentationIcon, SunMedium, Workflow } from "lucide-react"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  logo: Command,
  sun: SunMedium,
  moon: Moon,
  idea: Lightbulb,
  presentation: PresentationIcon,
  document: FileText,
  code: Code,
  build: Workflow,
  product: PackageSearch,
}

export const Icons: IconsType = icons
