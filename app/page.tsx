import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Error from "@/components/layout/Error";
import Loading from "@/components/layout/Loading";
import SuccessWrapper from "@/components/layout/SuccessWrapper";
import ImageInput from "@/components/ImageInput";
import Results from "@/components/Results";
import ModelSelector from "@/components/ModelSelector";
export default function Home() {
  return (
    <main className="pb-20">
      <Card>
        <CardContent className="px-4 pt-4">
          <Card className="w-full mb-4">
            <ModelSelector />
          </Card>
          <ImageInput />
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight font-bold text-xl">Results</h3>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <Loading />
          <Error />
          <SuccessWrapper>
            <Results />
          </SuccessWrapper>
        </CardContent>
      </Card>
    </main>
  );
}
