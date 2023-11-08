import { Button } from "@/components/ui/button";

import { prepareWellcomeEmail, sendMail } from "@/lib/mail";
import { SendHorizonalIcon } from "lucide-react";

export default function Home() {
  const send = async () => {
    "use server";

    await prepareWellcomeEmail();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <form>
        <Button formAction={send}>send mail</Button>
      </form>
    </main>
  );
}
