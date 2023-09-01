namespace TSDParser;

public static class TSDParser
{
    public static SourceFile ParseDefinition(string definition)
    {
        return SourceFileParsers.SourceFile.Parse(definition);
    }
}
