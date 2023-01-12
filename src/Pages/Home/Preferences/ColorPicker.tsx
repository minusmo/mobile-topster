import { useState } from "react";
import { Box } from "@mui/material";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface IColorPicker {
    title: string;
    onPick: (color: string) => void;
}

export const ColorPicker = ({
    title,
    onPick,
}: IColorPicker): JSX.Element => {
    const [color, setColor] = useState('#000');
    const [opened, setOpened] = useState(false);

    return (
        <Box>
            <Button 
                variant={'contained'}
                onClick={() => {setOpened(true)}}
            >
                {title}
            </Button>
            <Dialog open={opened} onClose={() => setOpened(false)}>
                <DialogTitle>Pick a Color you want</DialogTitle>
                <DialogContent>
                    <HexColorPicker 
                        color={color}
                        onChange={(newColor: string) => {
                            setColor(newColor);
                            onPick(newColor);
                        }} 
                    />
                    <HexColorInput
                        placeholder={'Type HEX Color'}
                        color={color} 
                        onChange={(newColor: string) => {
                            setColor(newColor);
                            onPick(newColor);
                        }}
                        alpha
                        prefixed 
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant={'outlined'}
                        onClick={() => setOpened(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}