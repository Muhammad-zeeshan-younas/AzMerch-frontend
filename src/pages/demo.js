function HelloWorld(printValue = [], index = 0) {
  if (index >= 100) return;
  if (index < 100) {
    printValue.push("Hello World");
    HelloWorld(++index);
  }
  return printValue;
}

result = HelloWorld();
