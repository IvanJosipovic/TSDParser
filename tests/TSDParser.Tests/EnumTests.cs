namespace TSDParser.Tests;

public class EnumTests
{
    [Fact]
    public void Enum()
    {
        var tsd = """
                /**
                * Comment Root
                */
                export declare const enum EnumName {
                    /**
                     * Comment1
                     */
                    Unknown = 0,
                    /**
                     * Comment2
                     */
                    NonRetryableStatus = 1
                }
                """;
        var output = EnumParsers.EnumDeclaration.Parse(tsd);

        output.Should().BeOfType<EnumDeclaration>();
        output.Kind.Should().Be(SyntaxKind.EnumDeclaration);

        output.Modifiers[0].Should().BeOfType<ExportKeyword>();
        output.Modifiers[1].Should().BeOfType<DeclareKeyword>();
        output.Modifiers[2].Should().BeOfType<ConstKeyword>();
        output.Modifiers[2].As<ConstKeyword>().Kind.Should().Be(SyntaxKind.ConstKeyword);

        output.Name.Text.Should().Be("EnumName");
        output.JSDoc.Comment.Should().Be("Comment Root");

        output.Members[0].Kind.Should().Be(SyntaxKind.EnumMember);
        output.Members[0].Name.Text.Should().Be("Unknown");
        output.Members[0].JSDoc.Comment.Should().Be("Comment1");
        output.Members[0].Initializer.Should().BeOfType<FirstLiteralToken>();
        output.Members[0].Initializer.As<FirstLiteralToken>().Kind.Should().Be(SyntaxKind.FirstLiteralToken);
        output.Members[0].Initializer.As<FirstLiteralToken>().Text.Should().Be("0");

        output.Members[1].Name.Text.Should().Be("NonRetryableStatus");
        output.Members[1].JSDoc.Comment.Should().Be("Comment2");
        output.Members[1].Initializer.Should().BeOfType<FirstLiteralToken>();
        output.Members[1].Initializer.As<FirstLiteralToken>().Text.Should().Be("1");
    }

    [Fact]
    public void EnumNoInitializer()
    {
        var tsd = """
                enum Direction {
                  Up,
                  Down,
                  Left,
                  Right
                }
                """;
        var output = EnumParsers.EnumDeclaration.Parse(tsd);

        output.Should().BeOfType<EnumDeclaration>();

        output.Name.Text.Should().Be("Direction");

        output.Members[0].Name.Text.Should().Be("Up");
        output.Members[1].Name.Text.Should().Be("Down");
        output.Members[2].Name.Text.Should().Be("Left");
        output.Members[3].Name.Text.Should().Be("Right");
    }

    [Fact]
    public void EnumNoInitializerExtraComma()
    {
        var tsd = """
                enum Direction {
                  Up,
                  Down,
                  Left,
                  Right,
                }
                """;
        var output = EnumParsers.EnumDeclaration.Parse(tsd);

        output.Should().BeOfType<EnumDeclaration>();

        output.Name.Text.Should().Be("Direction");

        output.Members[0].Name.Text.Should().Be("Up");
        output.Members[1].Name.Text.Should().Be("Down");
        output.Members[2].Name.Text.Should().Be("Left");
        output.Members[3].Name.Text.Should().Be("Right");
    }

    [Fact]
    public void EnumStrings()
    {
        var tsd = """
                enum Direction {
                  Up = "UP",
                  Down = "DOWN",
                }
                """;
        var output = EnumParsers.EnumDeclaration.Parse(tsd);

        output.Should().BeOfType<EnumDeclaration>();

        output.Name.Text.Should().Be("Direction");

        output.Members[0].Name.Text.Should().Be("Up");
        output.Members[0].Initializer.Should().BeOfType<StringLiteral>();
        output.Members[0].Initializer.As<StringLiteral>().Text.Should().Be("UP");

        output.Members[1].Name.Text.Should().Be("Down");
        output.Members[1].Initializer.Should().BeOfType<StringLiteral>();
        output.Members[1].Initializer.As<StringLiteral>().Text.Should().Be("DOWN");
    }

    [Fact]
    public void EnumStringsSingleQuote()
    {
        var tsd = """
                enum Direction {
                  Up = 'UP',
                  Down = 'DOWN',
                }
                """;
        var output = EnumParsers.EnumDeclaration.Parse(tsd);

        output.Should().BeOfType<EnumDeclaration>();

        output.Name.Text.Should().Be("Direction");

        output.Members[0].Name.Text.Should().Be("Up");
        output.Members[0].Initializer.Should().BeOfType<StringLiteral>();
        output.Members[0].Initializer.As<StringLiteral>().Text.Should().Be("UP");

        output.Members[1].Name.Text.Should().Be("Down");
        output.Members[1].Initializer.Should().BeOfType<StringLiteral>();
        output.Members[1].Initializer.As<StringLiteral>().Text.Should().Be("DOWN");
    }
}
