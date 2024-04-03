import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="w-full flex-center h-screen">
      <SignIn />
    </main>
  );
};
export default SignInPage;
