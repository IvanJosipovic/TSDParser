using TSDParser.Parsers;

namespace TSDParser.Tests;

public class Interfaces
{
    [Fact]
    public void Empty()
    {
        var tsd = """export interface SomeType {}""";
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Kind.Should().Be(SyntaxKind.InterfaceDeclaration);
    }

    [Fact]
    public void InterfaceExtends()
    {
        var tsd = """
            export interface SomeType extends One, Two, Three {
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.HeritageClauses[0].Types[0].Expression.Text.Should().Be("One");
        output.HeritageClauses[0].Types[1].Expression.Text.Should().Be("Two");
        output.HeritageClauses[0].Types[2].Expression.Text.Should().Be("Three");
    }

    [Fact]
    public void InterfaceExtendsNoSpace()
    {
        var tsd = """
            export interface SomeType extends One,Two,Three {
            }
            """;
        var output = InterfaceParsers.InterfaceDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.HeritageClauses[0].Types[0].Expression.Text.Should().Be("One");
        output.HeritageClauses[0].Types[1].Expression.Text.Should().Be("Two");
        output.HeritageClauses[0].Types[2].Expression.Text.Should().Be("Three");
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

        output.Statements[0].Should().BeOfType<PropertySignature>();
        output.Statements[0].As<PropertySignature>().Name.Text.Should().Be("name");
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

        output.Statements[0].Should().BeOfType<PropertySignature>();
        output.Statements[0].As<PropertySignature>().Name.Text.Should().Be("name");

        output.Statements[1].Should().BeOfType<PropertySignature>();
        output.Statements[1].As<PropertySignature>().Name.Text.Should().Be("name2");
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

        output.Statements[0].Should().BeOfType<PropertySignature>();
        output.Statements[0].As<PropertySignature>().Name.Text.Should().Be("myfunc");
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

        output.Statements[0].Should().BeOfType<PropertySignature>();
        output.Statements[0].As<PropertySignature>().Name.Text.Should().Be("myfunc");

        output.Statements[1].Should().BeOfType<PropertySignature>();
        output.Statements[1].As<PropertySignature>().Name.Text.Should().Be("myfunc2");
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
        output.Name.Comment.Should().Be("Interface Comment");
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

        output.Statements[0].Should().BeOfType<PropertySignature>();
        output.Statements[0].As<PropertySignature>().Name.Text.Should().Be("myprop");
        output.Statements[0].As<PropertySignature>().Type.Should().BeOfType<VoidKeyword>();

        output.Statements[1].Should().BeOfType<MethodSignature>();
        output.Statements[1].As<MethodSignature>().Name.Text.Should().Be("myfunc");
        output.Statements[1].As<MethodSignature>().Type.Should().BeOfType<VoidKeyword>();

        output.Statements[2].Should().BeOfType<PropertySignature>();
        output.Statements[2].As<PropertySignature>().Name.Text.Should().Be("myprop1");
        output.Statements[2].As<PropertySignature>().Type.Should().BeOfType<VoidKeyword>();

        output.Statements[3].Should().BeOfType<MethodSignature>();
        output.Statements[3].As<MethodSignature>().Name.Text.Should().Be("myfunc1");
        output.Statements[3].As<MethodSignature>().Type.Should().BeOfType<VoidKeyword>();
    }
}