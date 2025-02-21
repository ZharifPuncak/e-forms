import { useState } from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import { FileDropzone } from "@/components/core/file-dropzone";

function FileUploader(props) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrop = (acceptedFiles) => {

  

        const maxSize = 11 * 1024 * 1024; // 10MB in bytes
        const validFiles = acceptedFiles.filter(file => file.size <= maxSize);

        if (validFiles.length === acceptedFiles.length) {
            props.update(acceptedFiles[0]);
            setSelectedFile(acceptedFiles[0]);
        } else {
            props.update(acceptedFiles[0]);
            // setSelectedFile(null);
            // props.update(null);
        }
     
    };

    const handleRemove = () => {
        setSelectedFile(null);
        props.update(null);
    };

    return (
        <div>
            {!selectedFile ? (
                <FileDropzone
                    accept={{ "application/pdf": [] }}
                    caption="(PDF of maximum 10MB)"
                    onDrop={handleDrop}
                />
            ) : (
                <Card sx={{ borderRadius : 1}}>
                    <Box style={{ display: "flex", alignItems: "center", gap: "10px", padding : '10px' }}>
                        
                        <Typography variant='body2'> {selectedFile.name} </Typography>
                        <Typography variant='caption'> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</Typography>
                        <Button disabled={props?.progress > 0 || props.loading}  color="error" onClick={handleRemove} style={{ marginLeft: "auto" }}>
                            Remove
                        </Button>
                    </Box>
                    {props?.progress != 0 && (
                        <Box sx={{ marginTop: 2, padding : 2 }}>
                            <LinearProgress variant="determinate" value={props?.progress} />
                            <Typography variant="caption">{props?.progress}%</Typography>
                        </Box>
                    )}
                </Card>
            )}
        </div>
    );
}

export default FileUploader;
