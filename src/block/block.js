//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { PlainText } = wp.editor; // import Gutenberg default components here
const { Fragment } = wp.element;

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. 
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'elevenonline/block-gutenberg-simple-paragraph', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Simple Paragraph' ), // Block title.
	icon: 'editor-paragraph', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Simple Paragraph' ),
	],
	attributes: { // attributes is what we can interact with
		content: {
			type: 'string',
			source: 'children',
			selector: 'p',
			default: '',
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function({attributes, setAttributes, className, isSelected}) {
		const { content } = attributes;
		return (
			<Fragment>
				{
					isSelected ?
							<PlainText
								tagName="p"
								className={className}
								value={ content }
								onChange={ ( newContent ) => {
									setAttributes( {
										content: newContent,
									} );
								} }
							/>
					: <p className={className}>{content}</p>
				}
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function({attributes, className}) {
		const { content } = attributes;
		return (
			<p className={className}>{content}</p>
		);
	},
} );
