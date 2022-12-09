import time
from text_utils.image_utils import ImageText
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Returns the size of text
def get_text_size(font_filename, font_size, text):
    font = ImageFont.truetype(font_filename, font_size)
    return font.getsize(text)


# Returns the max fontsize for a given text, bounding box and font
def get_font_size(text, box_width, box_height, font):

    # Initialize starting font size
    font_size = 40
    prev_font_size = 40

    while True:
        # Divide the text into multiple lines based on box width
        lines = []
        line = []
        words = text.split()
        for word in words:
            new_line = ' '.join(line + [word])
            size = get_text_size(font, font_size, new_line)
            text_height = size[1]
            if size[0] <= box_width:
                line.append(word)
            else:
                lines.append(line)
                line = [word]
        if line:
            lines.append(line)
        lines = [' '.join(line) for line in lines if line]

        # Get the current text size
        text_height = 0
        text_width = 0
        for line in lines:
            temp_dim = get_text_size(font, font_size, line)
            if temp_dim[0] > text_width:
                text_width = temp_dim[0]
            if temp_dim[1] > text_height:
                text_height = temp_dim[1]
        text_height = len(lines) * text_height

        # Check if the text size exceeds the bounding box dimension
        if text_height > box_height or text_width > box_width:
            break
        else:
            prev_font_size = font_size
            font_size += 1
    return prev_font_size

def draw_dummy_text(base_image=None, data=None, mode="", background=(), size=()):
    # Dummy text
    header_text = "Build Audience"
    tag_text = "The technology keeps moving forward, which makes it easier for the artists to tell their stories and paint the pictures they want. George Lucas"

    # Get all header and tag elements
    header_elements = [element for element in data["canvas_elements"] if element["element_name"]=="header"]
    tag_elements = [element for element in data["canvas_elements"] if element["element_name"]=="tag"]
    media_elements = [element for element in data["canvas_elements"] if element["element_name"]=="media"]

    # Initaialize base image or text draw
    if not mode and not background:
        image_with_text = ImageText(background=(255, 255, 255), filename_or_size=base_image)
    else:
        image_with_text = ImageText(filename_or_size=size, mode=mode, background=background)
    renderd_image = None

    # Write header
    for header_element in header_elements:
        # Get font size
        font_size = get_font_size(header_text, header_element["width"], header_element["height"], header_element["font"])
        # Draw header text
        renderd_image = image_with_text.write_text_box((header_element["x1"], header_element["y1"]), header_text, box_width=header_element['width'], font_filename=header_element["font"],
                                    font_size=font_size, color=header_element["color"], place=header_element["alignment"])

    # Write tag
    for tag_element in tag_elements:
        # Get font size
        font_size = get_font_size(tag_text, tag_element["width"], tag_element["height"], tag_element["font"])
        # Draw header text
        renderd_image = image_with_text.write_text_box((tag_element["x1"], tag_element["y1"]), tag_text, box_width=tag_element['width'], font_filename=tag_element["font"],
                                    font_size=font_size, color=tag_element["color"], place=tag_element["alignment"])

    return renderd_image

def draw_text(header_text, tag_text, base_image=None, data=None, mode="", background=(), size=()):

    # Get all header and tag elements
    header_elements = [element for element in data["canvas_elements"] if element["element_name"]=="header"]
    tag_elements = [element for element in data["canvas_elements"] if element["element_name"]=="tag"]
    #media_elements = [element for element in data["canvas_elements"] if element["element_name"]=="media"]

    # Initaialize base image or text draw
    if not mode and not background:
        image_with_text = ImageText(background=(255, 255, 255), filename_or_size=base_image)
    else:
        image_with_text = ImageText(filename_or_size=size, mode=mode, background=background)
    renderd_image = None

    # Write header
    for header_element in header_elements:
        # Get font size
        font_size = get_font_size(header_text, header_element["width"], header_element["height"], header_element["font"])
        # Draw header text
        renderd_image = image_with_text.write_text_box((header_element["x1"], header_element["y1"]), header_text, box_width=header_element['width'], font_filename=header_element["font"],
                                    font_size=font_size, color=header_element["color"], place=header_element["alignment"])

    # Write tag
    for tag_element in tag_elements:
        # Get font size
        font_size = get_font_size(tag_text, tag_element["width"], tag_element["height"], tag_element["font"])

        # Draw header text
        renderd_image = image_with_text.write_text_box((tag_element["x1"], tag_element["y1"]), tag_text, box_width=tag_element['width'], font_filename=tag_element["font"],
                                    font_size=font_size, color=tag_element["color"], place=tag_element["alignment"])

    return renderd_image