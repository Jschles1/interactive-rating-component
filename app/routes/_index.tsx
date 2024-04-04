import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import Card from "~/components/card";
import Star from "~/components/star";
import { cn } from "~/utils";

function RatingButton({
  value,
  activeRating,
  onClick,
}: {
  value: number;
  activeRating: number | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-dark-blue rounded-full h-[2.625rem] w-[2.625rem] md:h-[3.1875rem] md:w-[3.1875rem] text-gray  flex items-center justify-center md:hover:text-white md:hover:bg-orange",
        activeRating === value && "bg-gray text-white"
      )}
    >
      <span className="text-sm md:text-base font-bold leading-0">{value}</span>
    </button>
  );
}

export const meta: MetaFunction = () => {
  return [{ title: "How Did We Do?" }, { name: "description", content: "" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.rating) {
    return redirect(`/thank-you?rating=${data.rating}`);
  }
  return null;
};

export default function Index() {
  const [rating, setRating] = useState<number | null>(null);

  function handleButtonClick(
    _: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) {
    if (rating === value) {
      setRating(null);
    } else {
      setRating(value);
    }
  }

  return (
    <Card>
      <Form id="feedback-form" method="post">
        <Star />
        <h1 className="text-white text-2xl md:text-[1.75rem] font-bold">
          How did we do?
        </h1>
        <p className="text-gray text-sm md:text-[0.9375rem] leading-[1.375rem] md:leading-[1.5rem] mt-[0.63rem] mb-6">
          Please let us know how we did with your support request. All feedback
          is appreciated to help us improve our offering.
        </p>
        <div className="flex items-center justify-between gap-4 mb-6">
          <RatingButton
            activeRating={rating}
            value={1}
            onClick={(e) => handleButtonClick(e, 1)}
          />
          <RatingButton
            activeRating={rating}
            value={2}
            onClick={(e) => handleButtonClick(e, 2)}
          />
          <RatingButton
            activeRating={rating}
            value={3}
            onClick={(e) => handleButtonClick(e, 3)}
          />
          <RatingButton
            activeRating={rating}
            value={4}
            onClick={(e) => handleButtonClick(e, 4)}
          />
          <RatingButton
            activeRating={rating}
            value={5}
            onClick={(e) => handleButtonClick(e, 5)}
          />
        </div>
        <input type="hidden" name="rating" value={rating || ""} />
        <button
          type="submit"
          disabled={rating === null}
          className="bg-orange w-full md:text-[0.9375rem] text-white py-3 uppercase text-center tracking-[0.11669rem] md:tracking-[0.125rem] text-sm font-bold rounded-[1.40625rem] disabled:bg-orange disabled:cursor-not-allowed disabled:text-white hover:text-orange hover:bg-white leading-normal"
        >
          Submit
        </button>
      </Form>
    </Card>
  );
}
