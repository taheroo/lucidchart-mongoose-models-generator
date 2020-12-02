# Lucidchart Mongoose Models Generator

Convert an UML class diagram to Mongoose Models. </br>
Generate Mongoose Models from UML Class Diagram exported to Csv file by [Lucidchart](https://lucid.co/product/lucidchart). </br>

## Features

Generate Mongoose Models. </br>
Generate Mongoose Models Relations ( right now, we support just OneToMany relation). </br>

## Installation

```bash
npm i -g lucidchart-mongoose-models-generator
```

## Usage Example

Create an UML Class Diagram at [Lucidchart](https://lucid.co/product/lucidchart). </br>
![usage example](https://github.com/taheroo/lucidchart-mongoose-models-generator/blob/master/images/lucidchart_uml_class_diagram.png)
Export Class Diagram to CSV file. </br>

```bash
npx lucidchart-mongoose-models-generator --csvFilePath="FILE_PATH"
```

Change File_PATH with your class diagram file path (make sure there is no space in the file name)

### Want to help

If you like this package, please star this repository. </br>
If you want to contribute to this package, feel free to create a pull request.
