import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const routes = [
    {
        path: "/projects",
        label: "Projects",
        icon: DateRangeOutlinedIcon,
    },
    {
        path: "/create-project",
        label: "Add",
        icon: AddCircleOutlineIcon,
    },
    {
        path: "/profile",
        label: "Profile",
        icon: PersonOutlineIcon,
    },
];

export const getRoutes = () => {
    return routes;
};