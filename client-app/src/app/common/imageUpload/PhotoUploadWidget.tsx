import React, { useEffect, useState } from "react";
import { Image, Grid, Header, ButtonGroup, Button } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { Field } from "formik";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
function PhotoUploadWidget() {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const {profileStore:{uploadProfilePhoto}}=useStore()
  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) =>uploadProfilePhoto(blob!,files[0].name));
    }
  }
  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <>
      <Grid>
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 1 - Add Photo"></Header>
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image"></Header>
          {files && files.length > 0 && (
            <PhotoWidgetCropper
              setCropper={setCropper}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload"></Header>
          {files && files.length > 0 && (
            <>
              <div
                className="img-preview"
                style={{ minHeight: 200, overflow: "hidden" }}
              ></div>
              <ButtonGroup widths={2}>
                <Button onClick={onCrop} positive icon="check" />
                <Button onClick={() => setFiles([])} icon="close" />
              </ButtonGroup>
            </>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
}

export default observer(PhotoUploadWidget);
