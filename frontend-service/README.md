# Frontend

## Development
Inside a `frontend-service/` folder

### Running 
```bash
npm install
npm run dev # start dev server
```

### Creating components:
You may leverage shadcn components. Put the component inside `src/components/ui` folder. Coresponding demonstation put inside `src/components/demo` folder and import it inside `App.tsx`.

```bash
npx shadcn@latest add <component-name>
```

```run game, then connect Network 1
npm run dev -- --host 0.0.0.0

```