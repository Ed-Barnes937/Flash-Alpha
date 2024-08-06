import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useDeckStore from "@/stores/DeckStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name text must be at least 2 characters." }),
});

const NewDeck = () => {
  const navigate = useNavigate();
  const addNewDeck = useDeckStore((store) => store.addNewDeck);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addNewDeck({
      name: values.name,
      id: "22222",
      cards: [],
    });

    navigate(`/decks`);
  }

  return (
    <div>
      <ul>
        <li>Deck Name input</li>
        <li>text area</li>
        <li>Manual Create button</li>
        <li>generate button</li>
      </ul>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  What is the name of this Deck?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
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
          /> */}
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => navigate(`/decks`)}>
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewDeck;
