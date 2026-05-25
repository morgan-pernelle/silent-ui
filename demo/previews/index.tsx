import { useState, type ReactElement } from "react";
import {
  Button,
  Link,
  Text,
  Heading,
  Label,
  Stack,
  Grid,
  Divider,
  Spacer,
  Card,
  CardBody,
  CardMedia,
  Input,
  Textarea,
  SearchInput,
  DateInput,
  TimeInput,
  Select,
  Badge,
  Avatar,
  AvatarGroup,
  Alert,
  Tabs,
  TabsList,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  Progress,
  Skeleton,
  Spinner,
  Tooltip,
  Breadcrumb,
  IconButton,
  Fade,
  Reveal,
  Stagger,
  StaggerItem,
  HoverLift,
  Image,
  Modal,
  useToast,
} from "@silent-ui/react";
import { copy } from "../constants/previewCopy";
import { images } from "../constants/images";
import { commercePreviews } from "./commerce";

export function ButtonPreview() {
  return (
    <Stack direction="row" gap={4} align="center">
      <Button variant="ghost" icon="→">Explore</Button>
      <Button variant="primary">Get started</Button>
      <Button variant="outline">Docs</Button>
    </Stack>
  );
}

export function LinkPreview() {
  return <Link href="/docs/components">Browse components →</Link>;
}

export function TextPreview() {
  return (
    <Stack gap={3}>
      <Heading level={3}>{copy.heading}</Heading>
      <Text tone="muted">{copy.medium}</Text>
      <Label>{copy.label}</Label>
    </Stack>
  );
}

export function LayoutPreview() {
  return (
    <Stack gap={4}>
      <Grid cols={3} gap={4}>
        <div className="preview-box">Layout</div>
        <div className="preview-box">Grid</div>
        <div className="preview-box">Stack</div>
      </Grid>
      <Divider />
    </Stack>
  );
}

const cardPreviewItems = [
  {
    id: "ma",
    title: copy.principles.ma.title,
    desc: copy.principles.ma.desc,
    image: images.hero,
  },
  {
    id: "sei",
    title: copy.principles.sei.title,
    desc: copy.principles.sei.desc,
    image: images.temple,
  },
];

export function CardPreview() {
  return (
    <Grid cols={2} gap={6} equalHeight style={{ width: "100%", maxWidth: "40rem" }}>
      {cardPreviewItems.map((item) => (
        <Card key={item.id} interactive>
          <CardMedia src={item.image} alt={item.title} />
          <CardBody>
            <Stack gap={3}>
              <Heading level={4}>{item.title}</Heading>
              <Text variant="sm" tone="muted">
                {item.desc}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}

export function InputPreview() {
  return (
    <Stack gap={4} style={{ maxWidth: 320 }}>
      <Input label="Email" type="email" placeholder={copy.email} />
      <Textarea label="Message" placeholder={copy.message} rows={2} />
    </Stack>
  );
}

export function SearchInputPreview() {
  const [q, setQ] = useState("");
  return (
    <SearchInput
      placeholder={copy.search}
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onClear={() => setQ("")}
      style={{ maxWidth: 320 }}
    />
  );
}

export function DateInputPreview() {
  const [date, setDate] = useState("");
  return (
    <DateInput
      label="Ship date"
      value={date}
      onValueChange={setDate}
      min="2024-01-01"
      hint="Select a delivery date"
      style={{ maxWidth: 280 }}
    />
  );
}

export function TimeInputPreview() {
  const [time, setTime] = useState("");
  return (
    <TimeInput
      label="Pickup time"
      value={time}
      onValueChange={setTime}
      min="09:00"
      max="18:00"
      hint="Studio hours 9:00–18:00"
      style={{ maxWidth: 280 }}
    />
  );
}

export function SelectPreview() {
  const [value, setValue] = useState("light");
  return (
    <Select
      label={copy.theme.label}
      value={value}
      onValueChange={setValue}
      options={[
        { value: "light", label: copy.theme.light },
        { value: "dark", label: copy.theme.dark },
        { value: "system", label: copy.theme.system },
      ]}
      style={{ maxWidth: 280 }}
    />
  );
}

export function BadgePreview() {
  return (
    <Stack direction="row" gap={3}>
      <Badge dot>New</Badge>
      <Badge variant="solid">Sale</Badge>
      <Badge variant="outline">Limited</Badge>
    </Stack>
  );
}

export function AvatarPreview() {
  return (
    <AvatarGroup>
      <Avatar name="Yuki Tanaka" />
      <Avatar name="Mina Sato" />
      <Avatar src={images.portrait} alt="Contributor portrait" />
    </AvatarGroup>
  );
}

export function AlertPreview() {
  return (
    <Alert title={copy.alert.title} variant="info">
      {copy.alert.body}
    </Alert>
  );
}

export function TabsPreview() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <Tab value="overview">{copy.tabs.overview}</Tab>
        <Tab value="props">{copy.tabs.props}</Tab>
        <Tab value="recipes">{copy.tabs.recipes}</Tab>
      </TabsList>
      <TabPanel value="overview">
        <Text variant="sm" tone="muted">{copy.tabs.overviewText}</Text>
      </TabPanel>
      <TabPanel value="props">
        <Text variant="sm" tone="muted">{copy.tabs.propsText}</Text>
      </TabPanel>
      <TabPanel value="recipes">
        <Text variant="sm" tone="muted">{copy.tabs.recipesText}</Text>
      </TabPanel>
    </Tabs>
  );
}

export function AccordionPreview() {
  return (
    <Accordion type="single" defaultValue="motion">
      <AccordionItem value="motion">
        <AccordionTrigger value="motion">{copy.accordion.motion}</AccordionTrigger>
        <AccordionContent value="motion">{copy.accordion.motionBody}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="theming">
        <AccordionTrigger value="theming">{copy.accordion.theming}</AccordionTrigger>
        <AccordionContent value="theming">{copy.accordion.themingBody}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function SwitchPreview() {
  const [on, setOn] = useState(false);
  return (
    <Switch
      label={copy.switch}
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
    />
  );
}

export function CheckboxPreview() {
  return <Checkbox label={copy.checkbox} defaultChecked />;
}

export function RadioPreview() {
  const [val, setVal] = useState("light");
  return (
    <RadioGroup name="theme" value={val} onValueChange={setVal} label={copy.radio.label}>
      <Radio value="light" label={copy.radio.light} />
      <Radio value="dark" label={copy.radio.dark} />
    </RadioGroup>
  );
}

export function ProgressPreview() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Progress value={65} label={copy.progress} showValue />
    </div>
  );
}

export function SkeletonPreview() {
  return (
    <Stack gap={3} style={{ maxWidth: 280 }}>
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" style={{ width: "70%" }} />
    </Stack>
  );
}

export function SpinnerPreview() {
  return <Spinner size="md" />;
}

export function TooltipPreview() {
  return (
    <Tooltip content={copy.medium}>
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  );
}

export function BreadcrumbPreview() {
  return (
    <Breadcrumb
      items={[
        { label: copy.breadcrumb[0], href: "/" },
        { label: copy.breadcrumb[1], href: "/docs/components" },
        { label: copy.breadcrumb[2] },
      ]}
    />
  );
}

export function IconButtonPreview() {
  return (
    <Stack direction="row" gap={3}>
      <IconButton icon="↑" aria-label="Ship date" variant="outline" />
      <IconButton icon="×" aria-label="Pickup time" />
    </Stack>
  );
}

export function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={copy.modal.title}>
        <Text tone="muted">{copy.modal.body}</Text>
        <Spacer size={4} />
        <Button variant="ghost" onClick={() => setOpen(false)}>
          {copy.modal.cancel}
        </Button>
      </Modal>
    </>
  );
}

export function ToastPreview() {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: copy.toast.title,
          description: copy.toast.description,
        })
      }
    >
      Show toast
    </Button>
  );
}

export function ImagePreview() {
  return (
    <Image
      src={images.stone}
      alt={copy.label}
      aspect="square"
      style={{ maxWidth: 240 }}
    />
  );
}

export function NavPreview() {
  return (
    <Text variant="sm" tone="muted">
      {copy.medium}
    </Text>
  );
}

export function FadePreview() {
  return (
    <Fade>
      <Text>{copy.medium}</Text>
    </Fade>
  );
}

export function RevealPreview() {
  return (
    <Reveal>
      <Heading level={4}>{copy.heading}</Heading>
    </Reveal>
  );
}

export function StaggerPreview() {
  return (
    <Stagger>
      <Stack gap={2}>
        {copy.staggerBoxes.map((label) => (
          <StaggerItem key={label}>
            <div className="preview-box">{label}</div>
          </StaggerItem>
        ))}
      </Stack>
    </Stagger>
  );
}

export function HoverLiftPreview() {
  return (
    <HoverLift>
      <div className="preview-box" style={{ padding: "1.5rem 2rem" }}>
        Hover to lift
      </div>
    </HoverLift>
  );
}

export function SilentProviderPreview() {
  return <Text variant="sm" tone="muted">{copy.medium}</Text>;
}

export const previews: Record<string, () => ReactElement> = {
  "silent-provider": SilentProviderPreview,
  button: ButtonPreview,
  link: LinkPreview,
  text: TextPreview,
  layout: LayoutPreview,
  card: CardPreview,
  input: InputPreview,
  "search-input": SearchInputPreview,
  "date-input": DateInputPreview,
  "time-input": TimeInputPreview,
  select: SelectPreview,
  badge: BadgePreview,
  avatar: AvatarPreview,
  alert: AlertPreview,
  tabs: TabsPreview,
  accordion: AccordionPreview,
  switch: SwitchPreview,
  checkbox: CheckboxPreview,
  radio: RadioPreview,
  progress: ProgressPreview,
  skeleton: SkeletonPreview,
  spinner: SpinnerPreview,
  tooltip: TooltipPreview,
  breadcrumb: BreadcrumbPreview,
  "icon-button": IconButtonPreview,
  modal: ModalPreview,
  toast: ToastPreview,
  image: ImagePreview,
  nav: NavPreview,
  fade: FadePreview,
  reveal: RevealPreview,
  stagger: StaggerPreview,
  "hover-lift": HoverLiftPreview,
  ...commercePreviews,
};
