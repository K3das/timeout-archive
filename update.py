# This is mostly old

import os
import hashlib
import json
from tqdm import tqdm

MEMES_FOLDER = os.getenv("MEMES_FOLDER")

memes_files = [(os.path.join(MEMES_FOLDER, f), f) for f in os.listdir(
    MEMES_FOLDER) if os.path.isfile(os.path.join(MEMES_FOLDER, f))]

data = []

for f, name in tqdm(memes_files):
    if name[0] == "_":
        continue

    unix_time = os.path.getmtime(f)
    size = os.path.getsize(f)

    with open(f, "rb") as file:
        d = file.read()
        file_hash = hashlib.md5(d).hexdigest()
        file.close()

    file_format = name.split(".")[-1]
    shortname = ".".join(name.split(".")[:-1])

    data.append({
        "name": name,
        "time": round(unix_time),
        "format": file_format,
        "shortname": shortname,
        "hash": file_hash,
        "size": size
    })

data = sorted(data, key=lambda m: m["time"], reverse=True)

with open(os.path.join(MEMES_FOLDER, "_data.json"), "w") as outfile:
    json.dump(data, outfile)
