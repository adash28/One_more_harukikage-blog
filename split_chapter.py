import re
import os

def process_chapter():
    input_file = r"e:\new_website\One_more_harukikage-blog\content\novels\shen-yan-xi-san\chapter-1.md"
    output_dir = os.path.dirname(input_file)
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split front matter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            front_matter = parts[1]
            body = parts[2]
        else:
            body = content
    else:
        body = content

    # Regex to find section headers like (一), （一）, (二), etc.
    # We use capturing group to keep the delimiter
    pattern = re.compile(r'(^\s*[（\(][一二三四五六七八九十]+[）\)]\s*$)', re.MULTILINE)
    
    # Split content
    segments = pattern.split(body)
    
    # The first segment might be introduction or empty
    # segments[0] is text before first match
    # segments[1] is first delimiter
    # segments[2] is text after first match
    
    sections = []
    
    current_title_suffix = ""
    current_content = []
    
    # Handle intro text if any (before first section)
    if segments[0].strip():
         sections.append({
             "suffix": "序",
             "content": segments[0].strip()
         })

    for i in range(1, len(segments), 2):
        header = segments[i].strip()
        text = segments[i+1].strip() if i+1 < len(segments) else ""
        
        # Clean up header for filename/title
        clean_header = header.replace('(', '').replace(')', '').replace('（', '').replace('）', '').strip()
        
        sections.append({
            "suffix": header, # Keep original format for title
            "content": text,
            "filename_suffix": clean_header
        })

    # Write files
    base_weight = 10
    
    for idx, sec in enumerate(sections):
        weight = base_weight + idx
        
        # Map chinese numbers to arabic for filename if needed, or just use index
        # Simple mapping for filename
        filename = f"chapter-1-{idx+1}.md"
        filepath = os.path.join(output_dir, filename)
        
        # Format content: Ensure double newlines
        # Split by lines, strip, filter empty, join with \n\n
        lines = [line.strip() for line in sec['content'].split('\n') if line.strip()]
        formatted_body = '\n\n'.join(lines)
        
        # Construct new front matter
        new_content = f"""---
title: "第一章 {sec['suffix']}"
weight: {weight}
---

{formatted_body}
"""
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Created {filename} with weight {weight}")

    # Don't delete original yet, let user verify
    # os.remove(input_file) 

if __name__ == "__main__":
    process_chapter()
