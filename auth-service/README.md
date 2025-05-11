# to add required libs for the project
```
pipreqs ./
or
pipreqs ./ --force
if file already exists
```

# to install libs(use your python version)
```
python3.10 -m pip install -r requirements.txt

If you encountered this error:
"ERROR: Failed to build installable wheels for some pyproject.toml based projects (argon2)"
Try installing argon2-cffi instead:
python3.10 pip install argon2-cffi

```

# to run app
```
uvicorn main:app --reload
OR
python -m uvicorn main:app --reload
```