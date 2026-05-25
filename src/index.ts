// Theme
export { SilentProvider, useSilentTheme } from "./theme/SilentProvider";
export type { SilentTheme, SilentThemeConfig } from "./theme/types";

// Motion tokens
export { easing, duration, transition } from "./motion/easing";
export {
  fadeVariants,
  revealUpVariants,
  revealLeftVariants,
  scaleVariants,
  staggerContainer,
  staggerItem,
  lineDrawVariants,
} from "./motion/variants";

// Layout
export {
  Container,
  Section,
  Stack,
  Grid,
  Divider,
  Spacer,
} from "./components/Layout/Layout";

// Typography
export { Text, Heading, Label } from "./components/Text/Text";

// Actions
export { Button } from "./components/Button/Button";
export { Link, NavLink } from "./components/Link/Link";

// Surfaces
export { Card, CardMedia, CardBody, CardFooter } from "./components/Card/Card";
export type { CardProps } from "./components/Card/Card";
export type { SilentRadius } from "./styles/radius";
export { Input, Textarea } from "./components/Input/Input";
export type { FieldProps } from "./components/Input/Input";
export { SearchInput } from "./components/SearchInput/SearchInput";
export { DateInput } from "./components/DateInput/DateInput";
export { TimeInput } from "./components/TimeInput/TimeInput";
export type { TimeInputProps } from "./components/TimeInput/TimeInput";
export { Modal } from "./components/Modal/Modal";
export { Nav } from "./components/Nav/Nav";
export { Image } from "./components/Image/Image";
export type { ImageProps } from "./components/Image/Image";
export { Badge } from "./components/Badge/Badge";
export { Avatar, AvatarGroup } from "./components/Avatar/Avatar";
export { Alert } from "./components/Alert/Alert";
export { Tabs, TabsList, Tab, TabPanel } from "./components/Tabs/Tabs";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/Accordion/Accordion";
export { Switch } from "./components/Switch/Switch";
export { Checkbox } from "./components/Checkbox/Checkbox";
export { Radio, RadioGroup } from "./components/Radio/Radio";
export { Select } from "./components/Select/Select";
export type { SelectOption, SelectProps } from "./components/Select/Select";
export { Progress } from "./components/Progress/Progress";
export { Skeleton } from "./components/Skeleton/Skeleton";
export { Spinner } from "./components/Spinner/Spinner";
export { ToastProvider, useToast } from "./components/Toast/Toast";
export type { ToastItem } from "./components/Toast/Toast";
export { Tooltip } from "./components/Tooltip/Tooltip";
export { Breadcrumb } from "./components/Breadcrumb/Breadcrumb";
export type { BreadcrumbItem } from "./components/Breadcrumb/Breadcrumb";
export { IconButton } from "./components/IconButton/IconButton";
export { Scrollbar } from "./components/Scrollbar/Scrollbar";

// Commerce
export { Drawer } from "./components/Drawer/Drawer";
export type { DrawerProps } from "./components/Drawer/Drawer";
export { CartItem } from "./components/CartItem/CartItem";
export type { CartItemProps } from "./components/CartItem/CartItem";
export { defaultFormatPrice } from "./components/CartItem/cartUtils";
export { CartCheckout } from "./components/CartCheckout/CartCheckout";
export type { CartCheckoutProps } from "./components/CartCheckout/CartCheckout";
export { QuantityInput } from "./components/QuantityInput/QuantityInput";
export type { QuantityInputProps } from "./components/QuantityInput/QuantityInput";
export { Pagination } from "./components/Pagination/Pagination";
export type { PaginationProps } from "./components/Pagination/Pagination";
export { Dropdown } from "./components/Dropdown/Dropdown";
export type { DropdownProps, DropdownItem } from "./components/Dropdown/Dropdown";
export { Rating } from "./components/Rating/Rating";
export type { RatingProps } from "./components/Rating/Rating";
export { Chip } from "./components/Chip/Chip";
export type { ChipProps } from "./components/Chip/Chip";
export { Carousel } from "./components/Carousel/Carousel";
export type { CarouselProps } from "./components/Carousel/Carousel";
export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "./components/Table/Table";
export type { TableProps, TableCellProps } from "./components/Table/Table";
export { ProductCard } from "./components/ProductCard/ProductCard";
export type { ProductCardProps } from "./components/ProductCard/ProductCard";
export { ProductGallery } from "./components/ProductGallery/ProductGallery";
export type {
  ProductGalleryProps,
  ProductGalleryImage,
  ProductGalleryLayout,
} from "./components/ProductGallery/ProductGallery";

// Motion components
export { Fade } from "./components/Motion/Fade";
export { Reveal } from "./components/Motion/Reveal";
export { Stagger, StaggerItem } from "./components/Motion/Stagger";
export { HoverLift } from "./components/Motion/HoverLift";

// Utils
export { cn } from "./utils/cn";

// Styles — import in your app: import '@silent-ui/react/styles.css'
import "./styles/global.css";
