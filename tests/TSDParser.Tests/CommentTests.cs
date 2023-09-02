namespace TSDParser.Tests;

public class CommentTests
{
    [Fact]
    public void SingleLine()
    {
        var tsd = """
                /* Comment */
                """;
        var output = CommonParsers.Comment().Parse(tsd);

        output.Should().Be("Comment");
    }

    [Fact]
    public void SingleLineNoSpaces()
    {
        var tsd = """
                /*Comment*/
                """;
        var output = CommonParsers.Comment().Parse(tsd);

        output.Should().Be("Comment");
    }

    [Fact]
    public void MultiLine()
    {
        var tsd = """
                /*
                 Comment
                 Comment2
                */
                """;
        var output = CommonParsers.Comment().Parse(tsd);

        output.Should().Be("Comment\r\nComment2");
    }

    [Fact]
    public void MultiLineStar()
    {
        var tsd = """
                /**
                * comment
                */
                """;
        var output = CommonParsers.Comment().Parse(tsd);

        output.Should().Be("comment");
    }

    [Fact]
    public void SingleLineTilda()
    {
        var tsd = """/*~ comment */""";
        var output = CommonParsers.Comment().Parse(tsd);

        output.Should().Be("comment");
    }

    [Fact]
    public void MultiLineTilda()
    {
        var tsd = """
                /*~ Comment1
                *~ Comment2
                *~ Comment3
                */
                """;
        var output = CommonParsers.Comment().Parse(tsd);

        output.Should().Be("Comment1\r\nComment2\r\nComment3");
    }
}