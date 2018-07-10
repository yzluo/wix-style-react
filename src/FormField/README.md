# `<FormField/>`

Generic component to help build forms.

```js
<FormField label="Your name" required>
  <Input value={yourState.name} onChange={yourHandler}/>
</FormField>
```

With tooltip:

```js
<FormField label="Phone number" info="Don't forget area code">
  <Input value={yourState.number} onChange={yourHandler}/>
</FormField>
```

With length count:

> NOTE: when `children` is function (a.k.a. render prop), it receives `setCharactersLeft` which
> can be called with `number`

```js
<FormField label="Tweet">
  {({setCharactersLeft}) =>
    <Input onChange={event => setCharactersLeft(100 - event.target.value.length)}/>
  }
</FormField>
```
