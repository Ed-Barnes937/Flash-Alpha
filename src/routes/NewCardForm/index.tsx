import { Button } from "@components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/form";
import { Textarea } from "@components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import useDeckStore from "../../stores/DeckStore";

const formSchema = z.object({
  front: z.string().min(2, {
    message: "Front text must be at least 2 characters.",
  }),
  back: z.string().min(2, {
    message: "Back text must be at least 2 characters.",
  }),
});

const NewCardForm = () => {
  const addNewCard = useDeckStore((store) => store.addCardToDeck);
  const { deckId } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      front: "",
      back: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    deckId &&
      addNewCard(deckId, {
        id: "22",
        front: values.front,
        back: values.back,
      });

    navigate(`/deck/${deckId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="front"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Front Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Front" {...field} />
              </FormControl>
              <FormDescription>
                This will be the text on the front of your card
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="back"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Back Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Back" {...field} />
              </FormControl>
              <FormDescription>
                This will be the text on the back of your card
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={() => navigate(`/deck/${deckId}`)}>
          Cancel
        </Button>
      </form>
    </Form>
  );
};

export default NewCardForm;
