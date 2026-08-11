import sys
from PIL import Image, ImageDraw

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # 1. Flood fill from the top-left corner to find the black background
    # We create a mask for the background
    seed = (0, 0)
    # We use a color that is definitely not in the image to mark the background temporarily
    magenta = (255, 0, 255, 255)
    ImageDraw.floodfill(img, seed, magenta, thresh=15)
    
    # Now convert all magenta pixels to transparent
    data = img.getdata()
    new_data = []
    for item in data:
        if item[0] == 255 and item[1] == 0 and item[2] == 255:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # 2. Crop the image to its non-transparent bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print("Done processing image. Cropped to:", bbox)

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2])
