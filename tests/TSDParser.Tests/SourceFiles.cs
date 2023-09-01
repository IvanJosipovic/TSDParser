﻿using TSDParser.Parsers;

namespace TSDParser.Tests
{
    public class SourceFiles
    {
        [Fact]
        public void Plain()
        {
            var tsd = """export interface SomeType {}""";
            var output = SourceFileParsers.SourceFile.Parse(tsd);

            output.Should().BeOfType<SourceFile>();
            output.Statements[0].Should().BeOfType<InterfaceDeclaration>();
        }

        [Fact]
        public void Multi()
        {
            var tsd = """
                export interface SomeType {}
                export interface SomeType2 {}
                """;
            var output = SourceFileParsers.SourceFile.Parse(tsd);

            output.Should().BeOfType<SourceFile>();
            output.Statements[0].Should().BeOfType<InterfaceDeclaration>();
            output.Statements[1].Should().BeOfType<InterfaceDeclaration>();
        }

        [Fact]
        public void Combination()
        {
            var tsd = """
                import { MyClass } from '@org/package';
                /* comment */
                export interface SomeType {
                  myProp: string;
                  myMethod(): string;
                }
                """;
            var output = SourceFileParsers.SourceFile.Parse(tsd);

            output.Should().BeOfType<SourceFile>();

            output.Statements[0].Should().BeOfType<ImportDeclaration>();

            output.Statements[1].Should().BeOfType<InterfaceDeclaration>();

            output.Statements[1].As<InterfaceDeclaration>().Name.Text.Should().Be("SomeType");
            output.Statements[1].As<InterfaceDeclaration>().Name.Comment.Should().Be("comment");

            output.Statements[1].As<InterfaceDeclaration>().Statements[0].Should().BeOfType<Class.PropertySignature>();
            output.Statements[1].As<InterfaceDeclaration>().Statements[1].Should().BeOfType<MethodSignature>();
        }
    }
}
