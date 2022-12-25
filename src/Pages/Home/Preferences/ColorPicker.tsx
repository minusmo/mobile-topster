import { useState } from "react";
import { Box } from "@mui/material";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface IColorPicker {
    onPick: (color: string) => void;
}

export const ColorPicker = ({
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
                Pick a Background Color
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