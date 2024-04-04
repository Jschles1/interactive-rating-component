import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import ThankYouIllustration from "~/components/ThankYouIllustration";
import Card from "~/components/card";

export const meta: MetaFunction = () => {
  return [{ title: "Thank You" }, { name: "description", content: "" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const rating = new URL(request.url).searchParams.get("rating");
  const isValidRating = ["1", "2", "3", "4", "5"].includes(rating ?? "");
  invariant(isValidRating, "Missing or invalid rating param");
  return json({ rating });
};

export default function ThankYou() {
  const { rating } = useLoaderData<typeof loader>();
  return (
    <Card>
      <div className="flex flex-col items-center justify-center pt-[calc(2.13rem-1.5rem)] md:pt-[calc(2.81rem-1.5rem)] pb-[calc(2.31rem-1.5rem)] md:pb-[calc(2.81rem-1.5rem)]">
        <ThankYouIllustration />
        <div className="text-orange text-sm md:text-[0.9375rem] leading-[1.375rem] md:leading-[1.5rem] bg-dark-blue px-3 py-[0.31rem] md:px-[1.25rem] md:py-[0.25rem] rounded-[1.40625rem] my-6 md:my-8">
          You selected {rating} out of 5
        </div>
        <h1 className="text-white text-2xl md:text-[1.75rem] font-bold leading-normal mb-[0.63rem] md:mb-[0.44rem]">
          Thank You!
        </h1>
        <p className="text-gray text-sm md:text-[0.9375rem] leading-[1.375rem] md:leading-[1.5rem] text-center">
          We appreciate you taking the time to give a rating. If you ever need
          more support, don&apos;t hesitate to get in touch!
        </p>
      </div>
    </Card>
  );
}
