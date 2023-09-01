using TSDParser.Parsers;

namespace TSDParser.Tests;

public class ClassTests
{
    [Fact]
    public void Empty()
    {
        var tsd = """class SomeType {}""";
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Name.Kind.Should().Be(SyntaxKind.Identifier);
        output.Kind.Should().Be(SyntaxKind.ClassDeclaration);
    }

    [Fact]
    public void Export()
    {
        var tsd = """export class SomeType {}""";
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Kind.Should().Be(SyntaxKind.ClassDeclaration);
        output.Modifiers[0].Should().BeOfType<ExportKeyword>();
        output.Modifiers[0].As<ExportKeyword>().Kind.Should().Be(SyntaxKind.ExportKeyword);
    }

    [Fact]
    public void Declare()
    {
        var tsd = """declare class SomeType {}""";
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Kind.Should().Be(SyntaxKind.ClassDeclaration);
        output.Modifiers[0].Should().BeOfType<DeclareKeyword>();
        output.Modifiers[0].As<DeclareKeyword>().Kind.Should().Be(SyntaxKind.DeclareKeyword);
    }

    [Fact]
    public void ExportDeclare()
    {
        var tsd = """export declare class SomeType {}""";
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Modifiers[0].Should().BeOfType<ExportKeyword>();
        output.Modifiers[1].Should().BeOfType<DeclareKeyword>();
    }

    [Fact]
    public void Extends()
    {
        var tsd = """
            class SomeType extends One, Two, Three {}
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

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
            class SomeType extends One,Two,Three {}
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.HeritageClauses[0].Types[0].Expression.Text.Should().Be("One");
        output.HeritageClauses[0].Types[1].Expression.Text.Should().Be("Two");
        output.HeritageClauses[0].Types[2].Expression.Text.Should().Be("Three");
    }

    [Fact]
    public void Implements()
    {
        var tsd = """
            class SomeType implements One, Two, Three {}
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.HeritageClauses[0].Kind.Should().Be(SyntaxKind.HeritageClause);
        output.HeritageClauses[0].Types[0].Kind.Should().Be(SyntaxKind.ExpressionWithTypeArguments);
        output.HeritageClauses[0].Types[0].Expression.Text.Should().Be("One");
        output.HeritageClauses[0].Types[1].Expression.Text.Should().Be("Two");
        output.HeritageClauses[0].Types[2].Expression.Text.Should().Be("Three");
    }

    [Fact]
    public void ImplementsNoSpace()
    {
        var tsd = """
            class SomeType implements One,Two,Three {}
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.HeritageClauses[0].Types[0].Expression.Text.Should().Be("One");
        output.HeritageClauses[0].Types[1].Expression.Text.Should().Be("Two");
        output.HeritageClauses[0].Types[2].Expression.Text.Should().Be("Three");
    }

    [Fact]
    public void Constructor()
    {
        var tsd = """
            class SomeType {
                constructor(name: string);
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Should().BeOfType<ClassDeclaration>();
        output.As<ClassDeclaration>().Name.Text.Should().Be("SomeType");
        output.As<ClassDeclaration>().Members[0].Should().BeOfType<Constructor>();
        output.As<ClassDeclaration>().Members[0].As<Constructor>().Kind.Should().Be(SyntaxKind.Constructor);
        output.As<ClassDeclaration>().Members[0].As<Constructor>().Parameters[0].Name.Text.Should().Be("name");
        output.As<ClassDeclaration>().Members[0].As<Constructor>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void Property()
    {
        var tsd = """
            class SomeType {
                name: string;
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Members[0].Should().BeOfType<PropertyDeclaration>();
        output.Members[0].As<PropertyDeclaration>().Name.Text.Should().Be("name");
    }

    [Fact]
    public void MultiProperty()
    {
        var tsd = """
            class SomeType {
                name: string;
                name2: string;
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Members[0].Should().BeOfType<PropertyDeclaration>();
        output.Members[0].As<PropertyDeclaration>().Name.Text.Should().Be("name");

        output.Members[1].Should().BeOfType<PropertyDeclaration>();
        output.Members[1].As<PropertyDeclaration>().Name.Text.Should().Be("name2");
    }

    [Fact]
    public void FunctionProperty()
    {
        var tsd = """
            class SomeType {
                myfunc: () => void;
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Members[0].Should().BeOfType<PropertyDeclaration>();
        output.Members[0].As<PropertyDeclaration>().Name.Text.Should().Be("myfunc");
    }

    [Fact]
    public void MultiFunctionProperty()
    {
        var tsd = """
            class SomeType {
                myfunc: () => void;
                myfunc2: (name: string) => void;
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Members[0].Should().BeOfType<PropertyDeclaration>();
        output.Members[0].As<PropertyDeclaration>().Name.Text.Should().Be("myfunc");

        output.Members[1].Should().BeOfType<PropertyDeclaration>();
        output.Members[1].As<PropertyDeclaration>().Name.Text.Should().Be("myfunc2");
    }

    [Fact]
    public void Comments()
    {
        var tsd = """
            /* Class Comment */
            class SomeType {
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.Name.Comment.Should().Be("Class Comment");
    }

    [Fact]
    public void Method()
    {
        var tsd = """
            class SomeType {
              myfunc(): void;
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Members[0].Should().BeOfType<MethodDeclaration>();
        output.Members[0].As<MethodDeclaration>().Name.Text.Should().Be("myfunc");
        output.Members[0].As<MethodDeclaration>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void MultiMethod()
    {
        var tsd = """
            class SomeType {
              myfunc(): void;
              myfunc2(): void;
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Members[0].Should().BeOfType<MethodDeclaration>();
        output.Members[0].As<MethodDeclaration>().Name.Text.Should().Be("myfunc");
        output.Members[0].As<MethodDeclaration>().Type.Should().BeOfType<VoidKeyword>();

        output.Members[1].Should().BeOfType<MethodDeclaration>();
        output.Members[1].As<MethodDeclaration>().Name.Text.Should().Be("myfunc2");
        output.Members[1].As<MethodDeclaration>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void MixStatements()
    {
        var tsd = """
            class SomeType {
              myprop: void;
              myfunc(): void;
              myprop1: void;
              myfunc1(): void;
            }
            """;
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");

        output.Members[0].Should().BeOfType<PropertyDeclaration>();
        output.Members[0].As<PropertyDeclaration>().Name.Text.Should().Be("myprop");
        output.Members[0].As<PropertyDeclaration>().Type.Should().BeOfType<VoidKeyword>();

        output.Members[1].Should().BeOfType<MethodDeclaration>();
        output.Members[1].As<MethodDeclaration>().Name.Text.Should().Be("myfunc");
        output.Members[1].As<MethodDeclaration>().Type.Should().BeOfType<VoidKeyword>();

        output.Members[2].Should().BeOfType<PropertyDeclaration>();
        output.Members[2].As<PropertyDeclaration>().Name.Text.Should().Be("myprop1");
        output.Members[2].As<PropertyDeclaration>().Type.Should().BeOfType<VoidKeyword>();

        output.Members[3].Should().BeOfType<MethodDeclaration>();
        output.Members[3].As<MethodDeclaration>().Name.Text.Should().Be("myfunc1");
        output.Members[3].As<MethodDeclaration>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Generic()
    {
        var tsd = """class SomeType<T> {}""";
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.TypeParameters[0].Name.Text.Should().Be("T");
    }

    [Fact]
    public void GenericMultiple()
    {
        var tsd = """class SomeType<T,T2> {}""";
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.TypeParameters[0].Name.Text.Should().Be("T");
        output.TypeParameters[1].Name.Text.Should().Be("T2");
    }

    [Fact]
    public void GenericConstraint()
    {
        var tsd = """class SomeType<T extends IPlugin> {}""";
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.TypeParameters[0].Name.Text.Should().Be("T");
        output.TypeParameters[0].Constraint.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].Constraint.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");
    }

    [Fact]
    public void GenericDefaultConstraint()
    {
        var tsd = """class SomeType<T extends IPlugin = IPlugin> {}""";
        var output = ClassParsers.ClassDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("SomeType");
        output.TypeParameters[0].Name.Text.Should().Be("T");
        output.TypeParameters[0].Constraint.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].Constraint.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");
        output.TypeParameters[0].Default.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].Default.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");
    }
}