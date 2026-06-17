import re, base64

path = r'C:\Users\15418\AppData\Local\Temp\trae\toolcall-output\1a99c119-e063-458a-ad17-184972ba7f18.txt'
txt = open(path, encoding='utf-8').read()
m = re.search(r'"data":"([^"]+)"', txt)
data = m.group(1) if m else ''
out = r'E:\projects\复习\weizhenzu-client\screenshot_home.png'
open(out, 'wb').write(base64.b64decode(data))
print('saved', out)
