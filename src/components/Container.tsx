import { useTheme } from "@mui/material/styles";

interface IContainer {
    children: JSX.Element[] | JSX.Element;
}

export const Container = ({ children }: IContainer): JSX.Element => {
    const theme = useTheme();
    return (
        <div
        style={{
            padding: `${theme.padding.default}%`,
            width: `calc(${100 - theme.padding.default * 2}%)`,
            height: 'fit-content'
        }}>
            {children}
        </div>
    );
}
