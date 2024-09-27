import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Home() {
  const token = cookies().get("l-t-k")?.value;
  return (
    <>
      <div className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-5xl font-bold">إختصرلي</h1>
        <p className="text-3xl font-semibold max-w-3xl">
          إختصرلي هي خدمة عربية لتسهيل عليك الوصول إلى جميع روابطك المهمه في
          لحظة.
        </p>
        <div className="flex gap-8">
          {token ? (
            <Link href="/profile">
              <Button className="shadow-sm font-semibold text-2xl">
                الصفحة الشخصية
              </Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button className="shadow-sm font-semibold text-2xl">
                سجل الان
              </Button>
            </Link>
          )}
          <Link href="/tour">
            <Button className="shadow-sm border border-gray-300  bg-white text-black hover:bg-gray-50 font-semibold text-2xl">
              خذ جولة
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
