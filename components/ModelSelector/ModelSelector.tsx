"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStore from "@/store";

type CompProps = {};
export default function ModelSelector({}: CompProps) {
  return (
    <div className="flex items-center  px-4 py-2 justify-between">
      <div className="inline-flex items-center space-x-2">
        <div className="font-bold"> Model : </div>
        <SelectModel />
      </div>
    </div>
  );
}

const options = [
  "facebook/detr-resnet-50",
  "hustvl/yolos-tiny",
  "facebook/detr-resnet-101",
  "hustvl/yolos-small",
  "valentinafeve/yolos-fashionpedia",
  "keremberke/yolov5m-license-plate",
  "facebook/detr-resnet-101-dc5",
  "nickmuchi/yolos-small-finetuned-license-plate-detection",
  "microsoft/table-transformer-structure-recognition",
  "TahaDouaji/detr-doc-table-detection",
  "hustvl/yolos-base",
  "biglam/detr-resnet-50_fine_tuned_nls_chapbooks",
];
function SelectModel() {
  const { model, setModel } = useStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));
  return (
    <Select value={model} onValueChange={setModel}>
      <SelectTrigger className="w-[500px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {options.map((i) => (
            <SelectItem value={i} key={i}>
              {i}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
