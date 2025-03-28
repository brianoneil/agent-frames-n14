import { SignIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { redirect_url?: string }
}) {
  const { userId } = await auth()
  
  // If the user is already signed in, redirect them
  if (userId) {
    console.log("🔍 User already signed in, redirecting to dashboard", { userId })
    redirect(searchParams.redirect_url || "/dashboard")
  }

  console.log("🔍 Rendering SignIn page for non-authenticated user")

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
            card: "bg-background",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "text-foreground",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background text-foreground",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            footerActionLink: "text-primary hover:text-primary/90",
          },
          layout: {
            socialButtonsPlacement: "bottom",
            privacyPageUrl: "/privacy",
            termsPageUrl: "/terms",
          },
        }}
        afterSignInUrl="/dashboard"
        redirectUrl={searchParams.redirect_url || "/dashboard"}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  )
} 