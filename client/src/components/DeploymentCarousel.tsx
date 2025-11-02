import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const deploymentSteps = [
  {
    url: "https://files.catbox.moe/fpkwp7.jpg",
    title: "Step 1: Enter Blueprint Name",
    description: "Start by giving your deployment a unique name"
  },
  {
    url: "https://files.catbox.moe/6190bb.jpg",
    title: "Step 2: Configure Environment Variables",
    description: "Set up your bot configuration (BOT_PREFIX, BOT_NUMBER, API keys, etc.)"
  },
  {
    url: "https://files.catbox.moe/4pfu26.jpg",
    title: "Step 3: Deploy Blueprint",
    description: "Click the Deploy Blueprint button to start"
  },
  {
    url: "https://files.catbox.moe/tqsvpd.jpg",
    title: "Step 4: Blueprint Created",
    description: "Your blueprint is now being set up"
  },
  {
    url: "https://files.catbox.moe/sc1tvi.jpg",
    title: "Step 5: Service Deployment",
    description: "Watch as your service gets deployed"
  },
  {
    url: "https://files.catbox.moe/eov86a.jpg",
    title: "Step 6: Building Your Bot",
    description: "View the deployment logs as your bot is built"
  },
  {
    url: "https://files.catbox.moe/oi0kjg.jpg",
    title: "Step 7: Service Live",
    description: "Copy your bot's URL - it's now live!"
  },
  {
    url: "https://files.catbox.moe/wuwwgn.jpg",
    title: "Step 8: Bot Interface",
    description: "Your bot's primary URL interface"
  },
  {
    url: "https://files.catbox.moe/m9l6iy.jpg",
    title: "Step 9: WhatsApp Connection",
    description: "Your bot is now connected and ready to serve on WhatsApp!"
  }
];

export default function DeploymentCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  };

  const scrollNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Deployment Preview</h3>
          <p className="text-xs text-muted-foreground">
            See what happens after you click Deploy to Render
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={selectedIndex === 0}
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs text-muted-foreground min-w-16 text-center">
            {selectedIndex + 1} / {deploymentSteps.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={selectedIndex === deploymentSteps.length - 1}
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border" ref={emblaRef}>
        <div className="flex">
          {deploymentSteps.map((step, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0"
              data-testid={`carousel-slide-${index}`}
            >
              <div className="space-y-3 p-4 bg-muted/30">
                <div className="aspect-[9/16] relative overflow-hidden rounded-md bg-background">
                  <img
                    src={step.url}
                    alt={step.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1">
        {deploymentSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (emblaApi) {
                emblaApi.scrollTo(index);
                setSelectedIndex(index);
              }
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === selectedIndex ? "bg-primary" : "bg-muted"
            }`}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
