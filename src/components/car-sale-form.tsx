
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Car,
  ScanLine,
  Wrench,
  Camera,
  User,
  FileCheck2,
  Loader2,
  ArrowLeft,
  Trash2,
  PartyPopper,
  Search,
  ArrowRight,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitOffer, getVehicleInfo } from "@/app/actions";
import Image from "next/image";

const formSchema = z.object({
  regNr: z.string().min(2, { message: "Danish reg. nr. is required." }).max(7),
  make: z.string().min(2, { message: "Make is required." }),
  model: z.string().min(2, { message: "Model is required." }),
  year: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 1900 && parseInt(val, 10) <= new Date().getFullYear() + 1, { message: "Please enter a valid year." }),
  mileage: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0, { message: "Please enter a valid mileage." }),
  condition: z.string().min(1, { message: "Please select the car's condition." }),
  price: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, { message: "Please enter a valid asking price." }),
  name: z.string().min(2, { message: "Your name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const steps = [
  { id: 1, name: "Registration Number", icon: ScanLine, fields: ["regNr"] },
  { id: 2, name: "Vehicle Details", icon: Wrench, fields: ["mileage", "condition", "price"] },
  { id: 3, name: "Upload Photos", icon: Camera },
  { id: 4, name: "Contact Info", icon: User, fields: ["name", "email", "phone"] },
  { id: 5, name: "Review & Submit", icon: FileCheck2 },
];

export function CarSaleForm() {
  const [step, setStep] = React.useState(1);
  const [isPending, startTransition] = React.useTransition();
  const [isFetching, setIsFetching] = React.useState(false);
  const [photos, setPhotos] = React.useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = React.useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regNr: "", make: "", model: "", year: "", mileage: "", condition: "", price: "", name: "", email: "", phone: "",
    },
  });

  const processForm = (data: FormSchemaType) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const result = await submitOffer(formData);
      if (result?.error) {
        toast({ variant: "destructive", title: "Oops!", description: result.error });
      }
      if (result?.success) {
        toast({ title: "Success!", description: result.success });
        setStep(6);
      }
    });
  };

  const handleFetchVehicleInfo = async () => {
    console.log("[FORM] 'Find Vehicle' button clicked.");
    const regNr = form.getValues("regNr");
    if (!regNr || regNr.length < 2) {
      form.setError("regNr", { type: "manual", message: "A valid registration number is required." });
      return;
    }

    setIsFetching(true);
    try {
      const result = await getVehicleInfo(regNr);

      if (result.error) {
        throw new Error(result.error);
      }
      
      if (result.success && result.data) {
        const { make, model, year } = result.data;
        
        form.setValue("make", make, { shouldValidate: true });
        form.setValue("model", model, { shouldValidate: true });
        form.setValue("year", year, { shouldValidate: true });
        
        setStep(s => s + 1);
        toast({ title: "Vehicle Found!", description: "We've pre-filled some details for you." });
      }
    } catch (error: any) {
      console.error("[FORM ERROR] Failed to call vehicle action:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not contact the vehicle service. Please try again.",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleNext = async () => {
    const fields = steps[step - 1].fields as (keyof FormSchemaType)[] | undefined;
    const isValid = fields ? await form.trigger(fields) : true;

    if (isValid) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => s - 1);
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const allFiles = [...photos, ...newFiles].slice(0, 10); // Limit to 10 photos
      setPhotos(allFiles);

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      const allPreviews = [...photoPreviews, ...newPreviews].slice(0, 10);
      
      // Revoke old URLs that are no longer in use
      photoPreviews.forEach(url => {
        if (!allPreviews.includes(url)) {
          URL.revokeObjectURL(url);
        }
      })
      setPhotoPreviews(allPreviews);
    }
  };
  
  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photoPreviews[index]);
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    return () => {
      photoPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photoPreviews]);

  const resetForm = () => {
    form.reset();
    setPhotos([]);
    setPhotoPreviews([]);
    setStep(1);
  };
  
  if (step === 6) {
    return (
        <Card className="bg-card shadow-2xl border-0">
            <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                <PartyPopper className="w-16 h-16 text-primary" />
                <h2 className="text-2xl font-bold">Offer Submitted!</h2>
                <p className="text-muted-foreground">Thank you for your submission. We've received your offer and will contact you shortly.</p>
                <Button onClick={resetForm} variant="outline" className="mt-4">Submit Another Car</Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="shadow-2xl border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                 {React.createElement(steps[step - 1].icon, { className: "h-6 w-6 text-primary" })}
                <span className="font-semibold text-lg">{steps[step - 1].name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
                Step {step} of {steps.length}
            </div>
        </div>
         <CardDescription className="pt-2">
           Please fill out the details for your vehicle.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)}>
          <CardContent>
            {step === 1 && (
              <FormField
                name="regNr"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danish Registration Number</FormLabel>
                    <div className="flex gap-2">
                      <div className="inline-flex items-center h-14 max-w-xs rounded-md border-2 border-primary bg-input overflow-hidden">
                        <div className="flex items-center justify-center h-full w-10 bg-blue-900 border-r-2 border-gray-300">
                          <Image src="/EU-section-with-DK.svg" alt="DK" width={28} height={40} className="object-contain" />
                        </div>
                        <Input
                          aria-label="Danish registration number"
                          placeholder="AB12345"
                          maxLength={7}
                          autoComplete="off"
                          inputMode="text"
                          className="h-full flex-1 min-w-0 rounded-none border-0 bg-transparent px-3 text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={field.value?.toUpperCase?.() || field.value}
                          onChange={(e) => {
                            const v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                            field.onChange(v);
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleFetchVehicleInfo}
                        disabled={isFetching}
                        size="icon"
                        className="h-14 w-14 rounded-md"
                      >
                        {isFetching ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          <Search className="h-6 w-6" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm p-4 bg-secondary rounded-lg">
                    <div>
                        <FormLabel className="text-muted-foreground">Make</FormLabel>
                        <p className="font-semibold text-lg">{form.getValues("make") || 'N/A'}</p>
                    </div>
                    <div>
                        <FormLabel className="text-muted-foreground">Model</FormLabel>
                        <p className="font-semibold text-lg">{form.getValues("model") || 'N/A'}</p>
                    </div>
                     <div>
                        <FormLabel className="text-muted-foreground">Year</FormLabel>
                        <p className="font-semibold text-lg">{form.getValues("year") || 'N/A'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField name="mileage" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Mileage (km)</FormLabel><FormControl><Input type="number" placeholder="e.g. 50000" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField name="condition" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Condition</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Excellent">Excellent</SelectItem><SelectItem value="Good">Good</SelectItem><SelectItem value="Fair">Fair</SelectItem><SelectItem value="Poor">Poor</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                <FormField name="price" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Asking Price (DKK)</FormLabel><FormControl><Input type="number" placeholder="e.g. 250000" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </div>
              </div>
            )}
            
            {step === 3 && (
                <div>
                    <FormLabel>Upload Car Photos</FormLabel>
                    <FormControl>
                        <Input id="photo-upload" type="file" multiple accept="image/*" onChange={handlePhotoChange} className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                    </FormControl>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {photoPreviews.map((src, index) => (
                            <div key={index} className="relative group aspect-square">
                                <Image src={src} alt={`Car photo preview ${index + 1}`} fill objectFit="cover" className="rounded-md" data-ai-hint="car detail" />
                                <Button type="button" size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removePhoto(index)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <FormField name="name" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField name="email" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField name="phone" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="+45 12 34 56 78" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Please review your offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm p-4 bg-secondary rounded-lg">
                    <div><strong className="text-muted-foreground">Reg. Nr.:</strong> {form.getValues("regNr")}</div>
                    <div><strong className="text-muted-foreground">Make:</strong> {form.getValues("make")}</div>
                    <div><strong className="text-muted-foreground">Model:</strong> {form.getValues("model")}</div>
                    <div><strong className="text-muted-foreground">Year:</strong> {form.getValues("year")}</div>
                    <div><strong className="text-muted-foreground">Mileage:</strong> {form.getValues("mileage")} km</div>
                    <div><strong className="text-muted-foreground">Condition:</strong> {form.getValues("condition")}</div>
                    <div><strong className="text-muted-foreground">Price:</strong> DKK {form.getValues("price")}</div>
                    <div><strong className="text-muted-foreground">Name:</strong> {form.getValues("name")}</div>
                    <div><strong className="text-muted-foreground">Email:</strong> {form.getValues("email")}</div>
                    <div><strong className="text-muted-foreground">Phone:</strong> {form.getValues("phone")}</div>
                </div>
                {photos.length > 0 && <div className="p-4 bg-secondary rounded-lg"><strong className="text-muted-foreground">Photos:</strong> {photos.length} uploaded</div>}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between pt-6">
            {step > 1 && step < 6 ? ( <Button type="button" variant="ghost" onClick={handleBack} disabled={isPending}> <ArrowLeft className="mr-2 h-4 w-4" /> Back </Button> ) : <div />}
            <div className={step === 1 ? 'w-full flex justify-end' : ''}>
                 {step < 2 && ( <Button type="button" onClick={handleNext} className="invisible" > 
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                 </Button> )}
                 {step > 1 && step < 5 && ( <Button type="button" onClick={handleNext}> 
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                 </Button> )}
                {step === 5 && ( <Button type="submit" disabled={isPending} className="w-full md:w-auto"> {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit Offer </Button> )}
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
