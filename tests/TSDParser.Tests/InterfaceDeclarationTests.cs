namespace TSDParser.Tests;

public class InterfaceDeclarationTests
{
    [Fact]
    public void Empty()
    {
        var tsd = """interface SomeType {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Name.Kind.Should().Be(SyntaxKind.Identifier);
        output.Kind.Should().Be(SyntaxKind.InterfaceDeclaration);
    }

    [Fact]
    public void Export()
    {
        var tsd = """export interface SomeType {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Kind.Should().Be(SyntaxKind.InterfaceDeclaration);
        output.Modifiers[0].Should().BeOfType<ExportKeyword>();
        output.Modifiers[0].As<ExportKeyword>().Kind.Should().Be(SyntaxKind.ExportKeyword);
    }

    [Fact]
    public void Declare()
    {
        var tsd = """declare interface SomeType {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Kind.Should().Be(SyntaxKind.InterfaceDeclaration);
        output.Modifiers[0].Should().BeOfType<DeclareKeyword>();
        output.Modifiers[0].As<DeclareKeyword>().Kind.Should().Be(SyntaxKind.DeclareKeyword);
    }

    [Fact]
    public void ExportDeclare()
    {
        var tsd = """export declare interface SomeType {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Modifiers[0].Should().BeOfType<ExportKeyword>();
        output.Modifiers[1].Should().BeOfType<DeclareKeyword>();
    }

    [Fact]
    public void Extends()
    {
        var tsd = """
            export interface SomeType extends One, Two, Three {}
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.HeritageClauses[0].Kind.Should().Be(SyntaxKind.HeritageClause);
        output.HeritageClauses[0].Types[0].Kind.Should().Be(SyntaxKind.ExpressionWithTypeArguments);
        output.HeritageClauses[0].Types[0].Expression.Text.Should().Be("One");
        output.HeritageClauses[0].Types[1].Expression.Text.Should().Be("Two");
        output.HeritageClauses[0].Types[2].Expression.Text.Should().Be("Three");
    }

    [Fact]
    public void ExtendsNoSpace()
    {
        var tsd = """
            export interface SomeType extends One,Two,Three {}
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.HeritageClauses[0].Types[0].Expression.Text.Should().Be("One");
        output.HeritageClauses[0].Types[1].Expression.Text.Should().Be("Two");
        output.HeritageClauses[0].Types[2].Expression.Text.Should().Be("Three");
    }

    [Fact]
    public void ImplementsGeneric()
    {
        var tsd = """export interface SomeType extends Type<CfgType> {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.HeritageClauses[0].Kind.Should().Be(SyntaxKind.HeritageClause);
        output.HeritageClauses[0].Types[0].Kind.Should().Be(SyntaxKind.ExpressionWithTypeArguments);
        output.HeritageClauses[0].Types[0].Expression.Text.Should().Be("Type");
        output.HeritageClauses[0].Types[0].TypeArguments[0].Should().BeOfType<TypeReference>();
        output.HeritageClauses[0].Types[0].TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("CfgType");
    }

    [Fact]
    public void Property()
    {
        var tsd = """
            export interface SomeType {
                name: string;
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Statements[0].Should().BeOfType<Class.PropertySignature>();
        output.Statements[0].As<Class.PropertySignature>().Name.Text.Should().Be("name");
    }

    [Fact]
    public void MultiProperty()
    {
        var tsd = """
            export interface SomeType {
                name: string;
                name2: string;
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Statements[0].Should().BeOfType<Class.PropertySignature>();
        output.Statements[0].As<Class.PropertySignature>().Name.Text.Should().Be("name");

        output.Statements[1].Should().BeOfType<Class.PropertySignature>();
        output.Statements[1].As<Class.PropertySignature>().Name.Text.Should().Be("name2");
    }

    [Fact]
    public void MultiPropertyLineBrakes()
    {
        var tsd = """
            export interface SomeType {
                name: string;
                name2: string;
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Statements[0].Should().BeOfType<Class.PropertySignature>();
        output.Statements[0].As<Class.PropertySignature>().Name.Text.Should().Be("name");

        output.Statements[1].Should().BeOfType<Class.PropertySignature>();
        output.Statements[1].As<Class.PropertySignature>().Name.Text.Should().Be("name2");
    }

    [Fact]
    public void FunctionProperty()
    {
        var tsd = """
            export interface SomeType {
                myfunc: () => void;
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Statements[0].Should().BeOfType<Class.PropertySignature>();
        output.Statements[0].As<Class.PropertySignature>().Name.Text.Should().Be("myfunc");
    }

    [Fact]
    public void MultiFunctionProperty()
    {
        var tsd = """
            export interface SomeType {
                myfunc: () => void;
                myfunc2: (name: string) => void;
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Statements[0].Should().BeOfType<Class.PropertySignature>();
        output.Statements[0].As<Class.PropertySignature>().Name.Text.Should().Be("myfunc");

        output.Statements[1].Should().BeOfType<Class.PropertySignature>();
        output.Statements[1].As<Class.PropertySignature>().Name.Text.Should().Be("myfunc2");
    }

    [Fact]
    public void Comments()
    {
        var tsd = """
            /* Interface Comment */
            export interface SomeType {
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.JSDoc.Comment.Should().Be("Interface Comment");
        output.JSDoc.Kind.Should().Be(SyntaxKind.JSDocComment);
    }

    [Fact]
    public void Method()
    {
        var tsd = """
            export interface SomeType {
              myfunc(): void;
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Statements[0].Should().BeOfType<MethodSignature>();
        output.Statements[0].As<MethodSignature>().Name.Text.Should().Be("myfunc");
        output.Statements[0].As<MethodSignature>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void MultiMethod()
    {
        var tsd = """
            export interface SomeType {
              myfunc(): void;
              myfunc2(): void;
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Statements[0].Should().BeOfType<MethodSignature>();
        output.Statements[0].As<MethodSignature>().Name.Text.Should().Be("myfunc");
        output.Statements[0].As<MethodSignature>().Type.Should().BeOfType<VoidKeyword>();

        output.Statements[1].Should().BeOfType<MethodSignature>();
        output.Statements[1].As<MethodSignature>().Name.Text.Should().Be("myfunc2");
        output.Statements[1].As<MethodSignature>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void MixStatements()
    {
        var tsd = """
            export interface SomeType {
              myprop: void;
              myfunc(): void;
              myprop1: void;
              myfunc1(): void;
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Statements[0].Should().BeOfType<Class.PropertySignature>();
        output.Statements[0].As<Class.PropertySignature>().Name.Text.Should().Be("myprop");
        output.Statements[0].As<Class.PropertySignature>().Type.Should().BeOfType<VoidKeyword>();

        output.Statements[1].Should().BeOfType<MethodSignature>();
        output.Statements[1].As<MethodSignature>().Name.Text.Should().Be("myfunc");
        output.Statements[1].As<MethodSignature>().Type.Should().BeOfType<VoidKeyword>();

        output.Statements[2].Should().BeOfType<Class.PropertySignature>();
        output.Statements[2].As<Class.PropertySignature>().Name.Text.Should().Be("myprop1");
        output.Statements[2].As<Class.PropertySignature>().Type.Should().BeOfType<VoidKeyword>();

        output.Statements[3].Should().BeOfType<MethodSignature>();
        output.Statements[3].As<MethodSignature>().Name.Text.Should().Be("myfunc1");
        output.Statements[3].As<MethodSignature>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Generic()
    {
        var tsd = """interface SomeType<T> {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.TypeParameters[0].Name.Text.Should().Be("T");
    }

    [Fact]
    public void GenericMultiple()
    {
        var tsd = """interface SomeType<T,T2> {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.TypeParameters[0].Name.Text.Should().Be("T");
        output.TypeParameters[1].Name.Text.Should().Be("T2");
    }

    [Fact]
    public void GenericConstraint()
    {
        var tsd = """interface SomeType<T extends IPlugin> {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.TypeParameters[0].Name.Text.Should().Be("T");
        output.TypeParameters[0].Constraint.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].Constraint.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");
    }

    [Fact]
    public void GenericDefaultConstraint()
    {
        var tsd = """interface SomeType<T extends IPlugin = IPlugin> {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.TypeParameters[0].Name.Text.Should().Be("T");
        output.TypeParameters[0].Constraint.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].Constraint.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");
        output.TypeParameters[0].Default.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].Default.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");
    }
}