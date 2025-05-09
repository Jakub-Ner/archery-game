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
```

# to run app
```
uvicorn main:app --reload
```